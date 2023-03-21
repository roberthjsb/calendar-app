import React, { useState, useEffect } from 'react'
import { NavBar } from './../ui/NavBar';
import moment from 'moment'
import 'moment/locale/es';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { messages } from '../../helper/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from './../../actions/ui';
import { eventsSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/addNewFab';
import { DeleteEventFab } from './../ui/DeleteEventFab';
import { CleanActiveEvent } from './../../actions/events';

moment.locale('es')
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
    const dispatch = useDispatch();
    const { events, eventActive } = useSelector(state => state.calendar);
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const { uid } = useSelector(state => state.auth);
    
    const isOwner = (event)=>event.user._id === uid
    const eventStyleGetter = (event, _start, _end, isSelected) => {
        const colorEvents = (!isOwner(event)) ? '#367CF7' : '#464646';
        const colorSelected = isSelected && isOwner && !!eventActive ? '#ec1515' : colorEvents
        return {
            style:{
                backgroundColor: colorSelected,
                borderRadius: '0px',
                opacity: 0.8,
                display: 'block',
            }
        }
    }
    useEffect(() => {
        dispatch(eventStartLoading())
        
    }, [dispatch])
    
    const onDoubleClickEvent = (event) => {
        if(!isOwner(event)) return;
        dispatch(eventsSetActive(event));
        dispatch(uiOpenModal());    
    }
    const onSelectEvent = (event) => {
        if(!isOwner(event)){
            dispatch(CleanActiveEvent())
        }else{
            dispatch(eventsSetActive(event))
        }
    }
    const onView = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e)
    }
    const onSelectSlot = (_e) => dispatch(CleanActiveEvent())

    return (
        <div className="calendar-screen">
            <NavBar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClickEvent}
                onSelectEvent={onSelectEvent}
                selectable={true}
                onSelectSlot={onSelectSlot}
                onView={onView}
                view={lastView}
                components={{ event: CalendarEvent }}
            />
            <AddNewFab />
            {(eventActive) && <DeleteEventFab />}
            <CalendarModal />
        </div>
    )
}
