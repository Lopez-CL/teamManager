import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddPlayer = ({ socket }) => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [error, setError] = useState({})
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        // socket.emit('addPlayer', {
        //     name,
        //     position
        // })
        // try {
        //     navigate('/player/list')
        //     console.log('catch from the back-end')
        // }catch(err) {
        //     console.log(err)
        //     console.log('error is caught on the front-end')
        //     setError(err.response.data.errors)
        // }
        axios.post('http://localhost:8000/api/createPlayer',{
            name,
            position
        }, {withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            navigate('/player/list')
            console.log('catch from the back-end')
        })
        .catch((err)=>{
            console.log(err)
            console.log('error is caught on the front-end')
            setError(err.response.data.errors)
        })
    }
    return (
        <div className='border border-1 py-2 px-3 col-7 mx-auto'>
            <div className='my-3 d-flex justify-content-start'>
                <p><NavLink className='text-start' to='/player/list'>List</NavLink> | </p>
                <p><NavLink className='mx-1 text-start' to='/players/addplayer'>Add Player</NavLink></p>
            </div>
            <div>
                <form onSubmit={submitHandler}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label className='form-label ' htmlFor="name">Player Name:</label>
                        <input className='form-control' type='text' id='name' onChange={(e) => setName(e.target.value)} />
                    </div>
                    {error.name && <div><p className='text-danger'>{error.name.message}</p></div>}
                    <br></br>
                    <div className='d-flex'>
                        <label className='form-label ' htmlFor="position">Preferred Position:</label>
                        <input className='form-control mb-3' type='text' id="position" onChange={(e) => setPosition(e.target.value)} />

                    </div>
                    <input type='submit' className='btn btn-success my-2' value='Sign up player!' />
                </form>
            </div>
        </div>
    )
}

export default AddPlayer