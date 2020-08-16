import types from './../types/types';

export const eventsAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});
export const eventsSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});
export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});
export const eventDeleted = (event) => ({
    type: types.eventDeleted
});

export const CleanActiveEvent = (event) => ({
    type: types.cleanActiveEvent
});
