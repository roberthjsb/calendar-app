import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { uiReducer } from './../reducers/uiReducer';
import { CalendarReducer } from './../reducers/calendarReducer';
import { authReducer } from './../reducers/authReducer';


const reducers = combineReducers({
    ui: uiReducer,
    calendar: CalendarReducer,
    auth: authReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers,
    composeEnhancers(applyMiddleware(thunk))
);