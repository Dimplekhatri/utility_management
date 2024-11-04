import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [action, setAction] = useState('');
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const registerLink = () => {
        setAction('active');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/Login', loginInfo);
            alert(response.data.message);
            localStorage.setItem('token', response.data.jwtToken);
            localStorage.setItem('name', response.data.name);
            navigate('/');
        } catch (error) {
            console.log("Error during login:", error.response.data.message);
            alert("Error during login");
        }
    };

    return (
        <div className='flex justify-center items-center'> 
        <div className={`wrapper${action}`}>
            <div className="form-box login">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="input-box">
                        <input name="email" onChange={handleChange} type="text" placeholder="Username" className="inside"required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input name="password" onChange={handleChange} type="password" placeholder="Password" required />
                        <FaLock className="icon" />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember Me</label>
                        <Link to='#' className='link'>Forgot password</Link>
                    </div>
                    <button type='submit'>Login</button>
                    <div className="register-Link">
                        <p>Don't have an account?</p>
                        <Link to='/signup' onClick={registerLink} className="account">Register</Link>
                    </div>
                </form>
            </div>
        </div>
        </div>
        
    );
};

export default Login;

