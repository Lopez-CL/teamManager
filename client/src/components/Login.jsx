import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const loginHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/login/coach',{
            email,
            password,
        },{withCredentials: true,credentials:'include'})
        .then((res) =>{
            console.log(res.data)
            navigate('/player/list')
            console.log('catch from the back-end')
        }).catch((err) => {
            console.log('defintely an error here')
            console.log(err, 'error is caught on the front end')
            setErrors(err.response.data.errors)
        })
    }
    return (
    <div className='col-4 d-flex flex-column'>
        <h1>Login, Coach</h1>
            <form onSubmit={loginHandler}>
                <div className='d-flex form-space'>
                    <label className='form-label'>Email:</label>
                    <input type='email' className='form-control' onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                <div className='d-flex form-space'>
                    <label className='form-label'>Password:</label>
                    <input type='password' className='form-control' onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                <div className='d-flex flex-end justify-content-end form-space'>
                    <input className='btn btn-success' type='submit' value='Login'/>
                </div>
            </form>
        </div>
    )
}

export default Login
