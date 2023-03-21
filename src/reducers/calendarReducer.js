import types from './../types/types';


const initialState = {
    events: [],
    eventActive: null
}

export const CalendarReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, payload]
            }
        case types.eventSetActive:
            return {
                ...state,
                eventActive: payload
            }
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(item => (item.id === payload.id) ? payload : item),
                eventActive: payload
            }
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(item => (item.id !== state.eventActive.id)),
                eventActive: null
            }
        case types.eventLoaded:
            return {
                ...state,
                events: [...payload]
            }
        case types.cleanActiveEvent:
            return {
                ...state,
                eventActive: null
            }
        default:
            return state
    }
}
export default CalendarReducer;
