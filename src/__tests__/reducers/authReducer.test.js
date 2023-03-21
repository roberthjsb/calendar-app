import { authReducer } from "../../reducers/authReducer";
import types from "../../types/types";

describe("authReducer", () => {
  const initialState = {
    checking: true,
    uid: null,
    name: null,
  };

  test("When authReducer receive authLogin type should return object with payload and checking false", () => {
    const payload = { uid: "204nflsf43353", name: "testUser" };

    const newState = authReducer(initialState, {
      type: types.authLogin,
      payload,
    });
    expect(newState).toEqual({ ...payload, checking: false });
  });

  test("When authReducer receive authLogout type , should return object with payload object with properties name and uid in null", () => {
    const initialState = {
      uid: "204nflsf43353",
      name: "testUser",
      checking: false,
    };

    const newState = authReducer(initialState, {
      type: types.authLogout,
    });
    expect(newState).toEqual(
      expect.objectContaining({
        name: null,
        uid: null,
      })
    );
  });

  test("When authReducer receive authCheckingFinish type , should return object with same value but checking property in true", () => {
    const initialState = {
      uid: "204nflsf43353",
      name: "testUser",
      checking: true,
    };

    const newState = authReducer(initialState, {
      type: types.authCheckingFinish,
    });
    expect(newState).toEqual({ ...initialState, checking: false });
  });

  test("When authReducer receive authLogout type , should return object with payload object with properties name and uid in null", () => {
    const initialState = {
      uid: "204nflsf43353",
      name: "testUser",
      checking: true,
    };

    const newState = authReducer(initialState, {
      type: 'unknown state',
    });
    expect(newState).toEqual(initialState);
  });
});
