import {
  CleanActiveEvent,
  eventsSetActive,
  eventStartDelete,
  eventStartLoading,
  eventStartUpdated,
  startEventsAddNew,
} from "../../actions/events";

import * as mockFetch from "../../helper/Fetcher";
import * as mockSwal from "sweetalert2";
import types from "../../types/types";

jest.mock("../../helper/Fetcher");
jest.mock("sweetalert2");

describe("events actions", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const event = {
    id: 1,
    title: "prueba 1",
    notes: "esto es una prueba",
    start: new Date("2023-01-01"),
    end: new Date("2023-01-02"),
  };
  const mockFetchDataError = {
    ok: false,
    msg: "error msg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  /*--------------*/
  describe("startEventAddNew Action", () => {

    beforeEach(() => {
      getState.mockReturnValue({
        auth: {
          uid: "",
          name: "",
        },
      });
    });

    test("should first", async () => {
      const spy = jest.spyOn(mockSwal, "fire");
      mockFetch.fetchWithToken.mockReturnValue({
        json: () => mockFetchDataError,
      });

      await startEventsAddNew(event)(dispatch, getState);
      expect(spy).toHaveBeenCalledWith(
        "Error",
        mockFetchDataError.msg,
        "error"
      );
    });

    test("should second", async () => {
      const mockFetchData = {
        ok: true,
        event: {
          ...event,
          id: "53dhgutkh8585t8ggiy8687ggi",
        },
      };

      mockFetch.fetchWithToken.mockReturnValue({ json: () => mockFetchData });

      await startEventsAddNew(event)(dispatch, getState);
      expect(dispatch).toHaveBeenCalled();
    });

    test("should third", async () => {
      const spyLog = jest.spyOn(console, "log");

      mockFetch.fetchWithToken.mockReturnValue({
        json: () => {
          throw new Error("Testing error");
        },
      });
      await startEventsAddNew({})(dispatch, getState);
      expect(dispatch).not.toHaveBeenCalled();
      expect(spyLog).toHaveBeenCalledWith(new Error("Testing error"));
    });
  });
  /*--------------*/

  describe("eventStartUpdated", () => {
    test("should call dispatch with action type 'eventUpdated' ", async () => {
      const mockFetchData = {
        ok: true,
      };

      mockFetch.fetchWithToken.mockReturnValue({
        json: () => mockFetchData,
      });

      await eventStartUpdated(event)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: types.eventUpdated,
        payload: event,
      });
    });

    test("should not call dispatch when fail fetch and should show alert with message error", async () => {
      mockFetch.fetchWithToken.mockReturnValue({json: () => mockFetchDataError,});

      const spy = jest.spyOn(mockSwal, "fire");

      await eventStartUpdated(event)(dispatch);
      expect(dispatch).not.toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(
        "Error",
        mockFetchDataError.msg,
        "error"
      );
    });

    test("should not call dispatch when trigger exception and should show alert with message exception", async () => {
      mockFetch.fetchWithToken.mockReturnValue({
        json: () => {
          throw new Error("Error fetch test");
        },
      });
      const spy = jest.spyOn(mockSwal, "fire");

      await eventStartUpdated(event)(dispatch);
      expect(dispatch).not.toHaveBeenCalledWith({
        type: types.eventUpdated,
        payload: event,
      });
      expect(spy).toHaveBeenCalledWith("Error", "Error fetch test", "error");
    });
  });
  /*--------------*/

  describe("eventStartDelete", () => {
    test("should Have Been Called dispatch with eventDeleted action", async () => {
      const mockFetchData = {
        ok: true,
      };

      getState.mockReturnValue({
        calendar: {
          eventActive: event,
        },
      });
      mockFetch.fetchWithToken.mockReturnValue({
        json: () => mockFetchData,
      });

      await eventStartDelete(event)(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith({ type: types.eventDeleted });
    });

    test("should not Have Been Called dispatch and have been called alert with error message", async () => {
      getState.mockReturnValue({
        calendar: {
          eventActive: event,
        },
      });
      mockFetch.fetchWithToken.mockReturnValue({
        json: () => mockFetchDataError,
      });
      const spy = jest.spyOn(mockSwal, "fire");

      await eventStartDelete(event)(dispatch, getState);
      expect(dispatch).not.toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(
        "Error",
        mockFetchDataError.msg,
        "error"
      );
    });

    test("should not Have Been Called dispatch and have been called alert with error message when throw exception", async () => {
      getState.mockReturnValue({
        calendar: {
          eventActive: event,
        },
      });
      mockFetch.fetchWithToken.mockReturnValue({
        json: () => {
          throw new Error("Error fetch test");
        },
      });
      const spy = jest.spyOn(mockSwal, "fire");

      await eventStartDelete(event)(dispatch, getState);
      expect(dispatch).not.toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith("Error", "Error fetch test", "error");
    });
  });
  /*--------------*/
  describe("eventStartLoading", () => {
    test("should call dispatch with action 'eventLoaded' with payload of array events from api ", async () => {
      const mockFetchData = {
        ok: true,
        events: [event],
      };

      mockFetch.fetchWithToken.mockReturnValue({
        json: () => mockFetchData,
      });

      await eventStartLoading()(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: types.eventLoaded,
        payload: [{ ...event }],
      });
    });

    test("should not call dispatch when Throw exception and should log error in console", async () => {
      getState.mockReturnValue({
        calendar: {eventActive: event,},
      });
      mockFetch.fetchWithToken.mockReturnValue({
        json: () => {throw new Error("Error fetch test");},
      });
      const spy = jest.spyOn(console, "log");

      await eventStartLoading()(dispatch);
      expect(dispatch).not.toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(new Error("Error fetch test"));
    });
  });
  /*--------------*/
  describe("Active Event", () => {
    test("should return CleanActiveEvent action", () => {
      const respuesta = CleanActiveEvent(null);
      expect(respuesta).toEqual({ type: types.cleanActiveEvent });
    });

    test("should retur eventsSetActive action", () => {
      const respuesta = eventsSetActive(event);
      expect(respuesta).toEqual({ type: types.eventSetActive, payload: event });
    });
  });
});
