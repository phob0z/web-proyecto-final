import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../components/contexts/auth/AuthContext';




export const PrivateRoute = ({ children }) => 
{
    const { logged } = useContext(AuthContext);

    return (logged) ? children : <Navigate to='/login' />
}
