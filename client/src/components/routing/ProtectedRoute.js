import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import Spinner from 'react-bootstrap/esm/Spinner';
import { Navigate } from 'react-router';

function ProtectedRoute({...props}) {
    const {authState} = useContext(AuthContext);
    if(authState.authLoading){
        return (
            <div className='spinner-container'>
                <Spinner animation='boerder' variant='info'/>
            </div>
        )
    }
    return(
        authState.isAuthenticated ? <Outlet/>: <Navigate to="/login"/>
    )
}

export default ProtectedRoute;