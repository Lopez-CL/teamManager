import React, {useState, useEffect} from 'react'
import { useInsertionEffect } from 'react';
import { NavLink } from 'react-router-dom'
import axios from'axios'
import {confirmAlert} from 'react-confirm-alert'

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
    const cutPlayer = (playerId,name) =>{
        confirmAlert({
            title: 'Confirm Cut',
            message: `Do you really want to cut ${name}?`,
            buttons:[
                {label: 'Cut player',
                onClick: ()=>{
                    axios.delete(`http://localhost:8000/api/deletePlayer/${playerId}`)
                    .then((res)=>{
                        console.log(res.data)
                        let updatedRoster = players.filter((player)=> player._id !== playerId)
                        setPlayers(updatedRoster);
                    })
                    .catch((err) => {
                        console.log(err, 'There was an issue cutting player')
                    })
                }
            },
            {label: 'Cancel!',
                onClick: () =>{
                    alert('No one was cut!')
                }
            }
            ]
        })
    }
    return (
        <div className='border border-1 py-2 px-3 col-7 mx-auto'>
            <div className='my-3 d-flex justify-content-start'>
                <p><NavLink className='text-start' to='/player/list'>List</NavLink> | </p>
                <p><NavLink className='mx-1 text-start' to='/players/addplayer'>Add Player</NavLink></p>
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
                                        <button onClick={(e)=> cutPlayer(player._id, player.name)} className='btn btn-danger border border-dark border-2 rounded-0 remove'>Cut from the team</button>
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