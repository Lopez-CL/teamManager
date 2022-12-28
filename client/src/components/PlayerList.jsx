import React, {useState, useEffect} from 'react'
import { useInsertionEffect } from 'react';
import { NavLink } from 'react-router-dom'
import axios from'axios'

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8000/api/getPlayers')
        .then((res) =>{
            console.log(res)
            console.log(res.data)
            setPlayers(res.data)
        })
        .catch((err)=>(console.log(err)))
    }, [])
    return (
        <div className='border border-1 py-2 px-3 col-7 mx-auto'>
            <div className='my-3 d-flex justify-content-start'>
                <NavLink className='text-start me-1' to='/player/list'>List</NavLink> 
                |<NavLink className='mx-1 text-start' to='/players/addplayer'>Add Player</NavLink>
            </div>
            <div>
                <table className='table table-striped border border-1'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Preferred Position</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            players.map((player, index)=>(
                                <tr key={index}>
                                    <td>{player.name}</td>
                                    <td>{player.position}</td>
                                    <td>
                                        <button className='btn btn-danger border border-dark border-2 rounded-0 remove'>Cut from the team</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PlayerList