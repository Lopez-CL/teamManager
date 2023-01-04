import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [username, setUsername] = useState('')
    const [title, setTitle] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const registerHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/register/coach',{
            username,
            email,
            title,
            password, 
            confirmPassword}, 
            {withCredentials: true,credentials:'include'})
        .then((res) =>{
            console.log(res.data)
            navigate('/player/list')
            console.log('catch from the back-end')
        }).catch((err) => {
            console.log(err, 'error is caught on the front end')
            setErrors(err.response.data.errors)
        })
    }
    return (
    <div className='col-4 d-flex flex-column'>
        <h1>Register as a Coach</h1>
            <form onSubmit={registerHandler}>
                {errors.username && <div><p className='text-danger'>{errors.username.message}</p></div>}
                <div className='d-flex form-space align-items-center'>
                    <label className='form-label'>Username:</label>
                    <input type='text' className='form-control' onChange={(e)=> setUsername(e.target.value)}/>
                </div>
                <div className='d-flex form-space align-items-center'>
                    <label className='form-label'>Email:</label>
                    <input type='email' className='form-control' onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                <div className='d-flex form-space align-items-center'>
                    <label className='form-label'>Position hired for:</label>
                    <select className='form-control' onChange={(e)=> setTitle(e.target.value)}>
                        <option>Select a Position</option>
                        <option value='Head Coach'>Head Coach</option>
                        <option value='Assistant Coach'>Assistant Coach</option>
                        <option value='Trainer'>Trainer</option>
                    </select>
                </div>
                {errors.password && <div><p className='text-danger mt-2'>{errors.password.message}</p></div>}
                <div className='d-flex form-space align-items-center'>
                    <label className='form-label'>Password:</label>
                    <input type='password' className='form-control' onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                <div className='d-flex form-space align-items-center'>
                    <label className='form-label'>Confirm Password:</label>
                    <input type='password' className='form-control' onChange={(e)=> setConfirmPassword(e.target.value)}  />
                </div>
                <div className='d-flex form-space align-items-center flex-end justify-content-end'>
                    <input className='btn btn-success' type='submit' value='Register'/>
                </div>
                
            </form>
        </div>
    )
}

export default Register