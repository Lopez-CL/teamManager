import React, {useState, useEffect} from 'react'
import { NavLink, useParams, useNavigate  } from 'react-router-dom'
import axios from'axios'

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const {num} = useParams();
    const navigate = useNavigate()
    const [triggerRequest, setTriggerRequest] = useState(false)
    useEffect(()=>{
        axios.get('http://localhost:8000/api/getPlayers',{withCredentials:true})
        .then((res) =>{
            console.log(res)
            console.log(res.data)
            setPlayers(res.data)
        })
        .catch((err)=>(console.log(err)))
    }, [triggerRequest])
    const statusHandler = (playerId,playerStatus) =>{
        let newData = {}
        if(num == 1){
            newData.statusG1 = playerStatus
        }
        else if(num == 2){
            newData.statusG2 = playerStatus
        }
        else{
            newData.statusG3 = playerStatus
        }
        axios.put(`http://localhost:8000/api/updatePlayer/${playerId}`, newData, {withCredentials:true})
        .then(res =>{
            console.log(playerStatus)
            console.log(res.data)
            setTriggerRequest(!triggerRequest)
        })
        .catch((err) => {
            console.log('error is caught on the front-end')
        })
        
    }
    return (
        <div className='border border-1 py-2 px-3 col-7 mx-auto'>
            <h2 className='text-start'>Player Status - Game {num}</h2>
            <div className='my-3 d-flex justify-content-center'>
                <p className='text-start me-1 game'><NavLink  to='/status/game/1'>Game 1</NavLink> | </p> 
                <p className='text-start me-1 game'><NavLink  to='/status/game/2'>Game 2</NavLink> | </p>
                <p className='text-start me-1 game'><NavLink  to='/status/game/3'>Game 3</NavLink></p>
                
            </div>
            <div>
                <table className='table table-striped border border-1'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            players.map((player, index)=>(
                                <tr key={index}>
                                    <td>{player.name}</td>
                                    {num == 1 ?
                                        <td>
                                        <button className={`mx-3 status ${player.statusG1 == 'Playing'?'playing':''}`} onClick={(e)=>statusHandler(player._id, 'Playing')}>Playing</button>
                                        <button className={`mx-3 status ${player.statusG1 == 'Not Playing'?'not-playing':''}`} onClick={(e)=>statusHandler(player._id, 'Not Playing')}>Not Playing</button>
                                        <button className={`mx-3 status ${player.statusG1 == 'Undecided'?'undecided':''}`} onClick={(e)=>statusHandler(player._id, 'Undecided')}>Undecided</button>
                                        </td>:''
                                    }
                                    { num == 2?
                                        <td>
                                        <button className={`mx-3 status ${player.statusG2 == 'Playing'?'playing':''}`} onClick={(e)=>statusHandler(player._id, 'Playing')}>Playing</button>
                                        <button className={`mx-3 status ${player.statusG2 == 'Not Playing'?'not-playing':''}`} onClick={(e)=>statusHandler(player._id, 'Not Playing')}>Not Playing</button>
                                        <button className={`mx-3 status ${player.statusG2 == 'Undecided'?'undecided':''}`} onClick={(e)=>statusHandler(player._id, 'Undecided')}>Undecided</button>
                                        </td>:''
                                    }
                                    { num == 3?
                                        <td>
                                        <button className={`mx-3 status ${player.statusG3 == 'Playing'?'playing':''}`} onClick={(e)=>statusHandler(player._id, 'Playing')}>Playing</button>
                                        <button className={`mx-3 status ${player.statusG3 == 'Not Playing'?'not-playing':''}`} onClick={(e)=>statusHandler(player._id, 'Not Playing')}>Not Playing</button>
                                        <button className={`mx-3 status ${player.statusG3 == 'Undecided'?'undecided':''}`} onClick={(e)=>statusHandler(player._id, 'Undecided')}>Undecided</button>
                                        </td>:''
                                    }
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