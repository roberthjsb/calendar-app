import types from './../types/types';
import { fetchWithToken } from '../helper/Fetcher';
import { prepareEvents } from './../helper/prepareEvents';
import Swal from 'sweetalert2';



export const startEventsAddNew = event => async (dispatch, getState) => {
    try {
        const { uid, name } = getState().auth;
        const resp = await fetchWithToken('event', event, 'POST');
        const body = await resp.json();

        if (!body.ok) {
            Swal.fire('Error', body.msg, 'error');
            return;
        }
        event.id = body.event.id;
        event.user = {
            _id: uid,
            name: name
        };
        dispatch(eventsAddNew(event));
    } catch (e) {
        console.log(e)
    }
}

const eventsAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});
export const eventsSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});


export const eventStartUpdated = event => async (dispatch) => {
    try {
        const resp = await fetchWithToken(`event/${event.id}`, event, 'PUT');
        const body = await resp.json();
        if (!body.ok) {
            Swal.fire('Error', body.msg, 'error');
            return;
        }
        dispatch(eventUpdated(event));
    } catch (error) {
        Swal.fire('Error', error.message, 'error');
    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartDelete = () => async (dispatch, getState) => {
    try {
        const { eventActive } = getState().calendar;
        const resp = await fetchWithToken(`event/${eventActive.id}`, {}, 'DELETE')
        const body = await resp.json();
        if (!body.ok) {
            Swal.fire('Error', body.msg, 'error');
            return;
        }
        dispatch(eventDeleted());
    } catch (error) {
        Swal.fire('Error', error.message, 'error');
    }
}


const eventDeleted = () => ({
    type: types.eventDeleted
});

export const CleanActiveEvent = (event) => ({
    type: types.cleanActiveEvent
});

export const eventStartLoading = () => async (dispatch) => {
    try {
        const resp = await fetchWithToken('event');
        const body = await resp.json();
        const events = prepareEvents(body.events);
        dispatch(eventLoaded(events))
    } catch (error) {
        console.log(error)
    }
}
const eventLoaded = (events) => (
    {
        type: types.eventLoaded,
        payload: events
    }
)

