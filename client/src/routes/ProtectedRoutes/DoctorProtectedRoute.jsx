import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

const DoctorProtectedRoute = ({children}) => {
const {isLoggedIn , userType} = useAuth()

if(!isLoggedIn){
    return <Navigate to="/" replace /> 
}


if(userType !== "doctor"){
    return <Navigate to="/user-dashboard" replace/>
}

return children
}


export default DoctorProtectedRoute