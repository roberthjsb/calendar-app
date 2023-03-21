import { startChecking, startLogin, startLogout, startUserRegister } from "../../actions/auth";
import types from "../../types/types";
import * as mockFetch from "../../helper/Fetcher";
import * as mockSwal from "sweetalert2";

jest.mock("../../helper/Fetcher");
jest.mock("sweetalert2");

describe("Unit test from auth actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("when startLogin is success should have been called the dispatch with type authLogin and payload user", async () => {
    const dispatch = jest.fn();
    const mockFetchData = {
      ok: true,
      token: "14fe43s4dtec",
      uid: "eq214214",
      name: "roberth",
    };
    mockFetch.fetchWithoutToken.mockReturnValue({json: () => mockFetchData});
    await startLogin("", "")(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: types.authLogin,
      payload: { uid: mockFetchData.uid, name: mockFetchData.name },
    });
  });

  test("when startLogin fail should have been called the dispatch with type authCheckingFinish and called aweetalert error with message", async () => {
    const dispatch = jest.fn();
    const mockFetchData = {
      ok: false,
      msg: "error msg",
    };
    const spy = jest.spyOn(mockSwal, "fire");
    mockFetch.fetchWithoutToken.mockReturnValue({
      json: () => mockFetchData,
    });
    await startLogin("", "")(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: types.authCheckingFinish });
    expect(spy).toHaveBeenCalledWith("Error", mockFetchData.msg, "error");
  });

  test("call startLogout should have been called clear in localstorage and dispatch with action type authLogout", () => {
    const spy = jest.spyOn(Storage.prototype, "clear");
    const dispatch = jest.fn();
    startLogout()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: types.authLogout });
    expect(spy).toHaveBeenCalled();
  });

  test("startChecking should have been called dispatch with action type authCheckingFinish", async () => {
    const dispatch = jest.fn();
    const mockFetchData = {
      ok: false,
    };
    mockFetch.fetchWithToken.mockReturnValue({
      json: () => mockFetchData,
    });
    await startChecking()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: types.authCheckingFinish });
  });

  test("should startChecking", async () => {
    const dispatch = jest.fn();
    const spy = jest.spyOn(Storage.prototype, "setItem");
    const mockFetchData = {
      ok: true,
      token: "14fe43s4dtec",
      uid: "eq214214",
      name: "roberth",
    };
    mockFetch.fetchWithToken.mockReturnValue({
      json: () => mockFetchData,
    });
    await startChecking()(dispatch);
    
    expect(dispatch).toHaveBeenCalledWith({
      type: types.authLogin,
      payload: { uid: mockFetchData.uid, name: mockFetchData.name },
    });
    expect(spy).toHaveBeenCalledWith("token", mockFetchData.token);
    expect(spy).toHaveBeenCalledWith("token-init-date", expect.anything());
  });

  test("when startUserRegister is success should have been called the dispatch with type authLogin and payload user", async () => {
    const dispatch = jest.fn();
    const mockFetchData = {
      ok: true,
      token: "14fe43s4dtec",
      uid: "eq214214",
      name: "roberth",
    };
    mockFetch.fetchWithoutToken.mockReturnValue({
      json: () => mockFetchData,
    });
    await startUserRegister("", "","")(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: types.authLogin,
      payload: { uid: mockFetchData.uid, name: mockFetchData.name },
    });
  });

  test("when startUserRegister fail should have been called the dispatch with type authCheckingFinish and called aweetalert error with message", async () => {
    const dispatch = jest.fn();
    const mockFetchData = {
      ok: false,
      msg: "error msg",
    };
    const spy = jest.spyOn(mockSwal, "fire");
    mockFetch.fetchWithoutToken.mockReturnValue({
      json: () => mockFetchData,
    });
    await startUserRegister("", "","")(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: types.authCheckingFinish });
    expect(spy).toHaveBeenCalledWith("Error", mockFetchData.msg, "error");
  });
});
