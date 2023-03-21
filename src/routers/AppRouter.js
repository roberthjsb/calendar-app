import React from 'react'
import {  BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { LoginScreen } from './../components/auth/LoginScreen';
import { CalendarScreen } from './../components/calendar/CalendarScreen';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { useSelector } from 'react-redux';

export const AppRouter = () => {
    const dispatch =useDispatch();
    const {checking,uid} = useSelector(state => state.auth);
    useEffect(
        () => {
            dispatch(startChecking())
        }
        , [dispatch]);
    if(checking) return (<h5>Autenticando...</h5>)
    return (
            <Router>
                <div>
                <Switch>
                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={CalendarScreen}
                        isAuthenticated={!!uid}
                    />
                    <PublicRoute 
                        exact path="/login" 
                        component={LoginScreen}
                        isAuthenticated={!!uid}
                    />
                    <Redirect to="/"/>
                </Switch>
                </div>
            </Router>
        )
}
