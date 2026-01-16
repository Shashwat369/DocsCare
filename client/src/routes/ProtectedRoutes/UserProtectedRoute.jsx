import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const UserProtectedRoute = ({children}) => {
 const {isLoggedIn , userType} = useAuth()

 if(!isLoggedIn){
    return <Navigate to="/" replace/>
 }

 if(userType !== "user"){
    return <Navigate to="/doctor-dashboard" replace/>
 }

 return children
}

export default UserProtectedRoute