import CalendarReducer from "../../reducers/calendarReducer"
import types from "../../types/types";

describe('CalendarReducer', () => { 
    const initialState = {
        events: [],
        eventActive: null
    }
    const event1 = {
        id: 1,
        title: "prueba 1",
        notes: "esto es una prueba",
        start: new Date("2023-01-01"),
        end: new Date("2023-01-02"),
      };
      const event2 = {
        id: 2,
        title: "prueba 2",
        notes: "nuevo evento",
        start: new Date("2023-02-15"),
        end: new Date("2023-02-17"),
      };

    test('eventAddNew should', () => { 
        const expectResult = {
            events: [event1],
            eventActive: null
        }
        const newState = CalendarReducer(initialState,{type:types.eventAddNew,payload:event1})
        expect(newState).toEqual(expectResult)

     })
     test('eventSetActive should', () => { 
        const expectResult = {
            events: [event1,event2],
            eventActive: event1
        }
        const initialState = {
            events: [event1,event2],
            eventActive: null
        }
        const newState = CalendarReducer(initialState,{type:types.eventSetActive,payload:event1})
        expect(newState).toEqual(expectResult)

     })

     test('cleanActiveEvent should', () => { 
        const expectResult = {
            events: [event1,event2],
            eventActive: null
        }
        const _initialState = {
            events: [event1,event2],
            eventActive: event2
        }
        const newState = CalendarReducer(_initialState,{type:types.cleanActiveEvent})
        expect(newState).toEqual(expectResult)

     })
     test('eventDeleted should', () => { 
        const expectResult = {
            events: [{...event1}],
            eventActive: null
        }
        const _initialState = {
            events: [event1,event2],
            eventActive: {...event2}
        }
        const newState = CalendarReducer(_initialState,{type:types.eventDeleted});
        expect(newState.events).toEqual(expectResult.events);

     })
     test('eventUpdated should', () => { 
        const ChangedEvent ={...event1, title:'new title' }
        const expectResult = {
            events: [ChangedEvent,event2],
            eventActive: ChangedEvent
        }
        const _initialState = {
            events: [event1,event2],
            eventActive: event1
        }
        const newState = CalendarReducer(_initialState,{type:types.eventUpdated,payload:ChangedEvent});
        expect(newState.eventActive).toEqual(expectResult.eventActive);

     })

     test('eventUpdated should', () => { 
        const ChangedEvent ={...event1, title:'new title' }
        const expectResult = {
            events: [ChangedEvent,event2],
            eventActive: ChangedEvent
        }
        const _initialState = {
            events: [event1,event2],
            eventActive: event1
        }
        const newState = CalendarReducer(_initialState,{type:types.eventUpdated,payload:ChangedEvent});
        expect(newState.eventActive).toEqual(expectResult.eventActive);

     })


     test('eventLoaded should', () => { 
        const expectResult = {
            events: [event1,event2],
            eventActive: null
        }
        const newState = CalendarReducer(initialState,{type:types.eventLoaded,payload:[event1,event2]});
        expect(newState).toEqual(expectResult);

     })

     test('every text should', () => { 
        const _initialState = {
            events: [event1,event2],
            eventActive: event2
        }
        const newState = CalendarReducer(_initialState,{type:'cualquier texto'});
        expect(newState).toEqual(_initialState);

     })
 })