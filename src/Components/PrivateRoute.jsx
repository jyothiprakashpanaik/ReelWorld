import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from "react";

export default function PrivateRoute() {
    const { user } = useContext(AuthContext);
    return  (user ? <Outlet /> : <Navigate to="login" />);
}