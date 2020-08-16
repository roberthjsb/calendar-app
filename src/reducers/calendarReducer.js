// import types from './../types/types';
import moment from 'moment';
import types from './../types/types';


const initialState = {
    events: [
        {
            title: 'Cumpleaños',
            start: moment().toDate(),
            end: moment().add(2, 'hours').toDate(),
            bgcolor: "#fafafa",
            notes: 'Comprar regalo',
            user: {
                _id: '123',
                name: 'Roberth'
            }
        }
    ],
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
                events: state.events.map(item => (item.id === payload.id) ? payload : item)
            }
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(item => (item.id !== state.eventActive.id)),
                eventActive: null
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
