import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
const Sign = () => {
    return (
        <div className='d-flex justify-content-evenly col-8 mx-auto mt-5'>
            <Register/>
            <Login/>
        </div>
    )
}

export default Sign