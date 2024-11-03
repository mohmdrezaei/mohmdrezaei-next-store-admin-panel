import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from 'utils/cookie';


    const PublicRoutes = () => {
        const token =getCookie('token');
        return token ? <Navigate to="/products" /> : <Outlet/>;
      
      }


export default PublicRoutes