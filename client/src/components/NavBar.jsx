import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()
    const handleLogOut = (e)=>{
        axios.get('http://localhost:8000/api/logout',{withCredentials:true,credentials:'include'})
        .then((res) => {
            navigate('/')
        })
    }
    return (
        <div className='d-flex mx-5 col-10 my-2 align-items-center'>
            <div className='d-flex col-5 my-2'>
                <NavLink className='me-2' to='/player/list'>Manage Player</NavLink>|
                <NavLink className='mx-1' to='/status/game/1'>Manage Players Status</NavLink>
            </div>
            <div className='d-flex col-8 justify-content-end my-2'>
                <Link onClick={handleLogOut}> Logout</Link>
            </div>
        </div>
    )
}

export default NavBar