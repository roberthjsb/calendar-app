import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';

// import {Offline,Online} from'react-detect-offline'

export const NavBar = () => {
    const {name} = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const handleLogout = () => dispatch(startLogout())
    
    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">{name}</span>
            {/* <Online>
                <span className='text-success' >Online</span>
            </Online>
            <Offline>
                <span className='text-danger' >Offline - peticiones seran guardadas</span>
            </Offline> */}
            <button
                onClick={handleLogout}
                className="btn btn-danger"
            >
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>
        </div>
    )
}
