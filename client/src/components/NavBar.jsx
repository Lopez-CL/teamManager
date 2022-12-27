import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className='display-flex col-3 my-2'>
            <NavLink className='mx-2' to='/player/list'>Manage Player</NavLink>|
            <NavLink className='mx-2' to='/status/game/1'>Manage Players Status</NavLink>
        </div>
    )
}

export default NavBar