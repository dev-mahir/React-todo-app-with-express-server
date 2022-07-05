import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import  axios  from 'axios';
import { useNavigate } from 'react-router';

function Login() {

    const navigate = useNavigate();

    const [ input, setInput] = useState({
        email: "",
        password: ""
    })

    const handleLoginForm = (e) => {
        e.preventDefault();
        if( input.email === "" || input.password === ""){
            alert('All fields are required');
        }else{ 
            axios.post("http://localhost:5050/api/user/login", input)
            .then( res => {
                setInput( res.data )
                JSON.stringify(localStorage.setItem('token', res.data.token))
                console.log("login success");
                e.target.reset();
                navigate('/todo')    
            })
            .catch(()=> {
                alert("Email or password incorect")
            });
        }
    }


    return (
        <div className='container'>
            <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className="form m-card shadow-sm w-25 p-4 bg-light">
                <form onSubmit={handleLoginForm} >

                    <div className='text-center mb-5'>  <h5>Welcome</h5> </div>

                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email'  onChange={e=> setInput({...input, email: e.target.value})} className='form-control' />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="text" id='password'  onChange={e=> setInput({...input, password: e.target.value})}  className='form-control' />
                    </div>
                    <div className='mt-2'>
                        <button className='btn bg-success btn-sm text-light mb-2' type='submit'>Login</button>
                    </div>

                    <div className='sign-up'>
                        <p>Don’t have an account? <Link to="/login">Signup</Link></p>
                    </div>

                </form>
            </div>
            </div>
        </div>
    )
}

export default Login;