// import React from 'react'
// import './Login.css';
// import { FaUser } from "react-icons/fa";
// import { FaLock } from "react-icons/fa";
// import { FaEnvelope } from "react-icons/fa";
// import {Link} from 'react-router-dom';
// import {useState} from 'react';
// const Signup = () => {
//     const [action,setAction] = useState('');
//     const loginLink=()=>{
//         setAction('active');
//     }
//     const [signUpInfo,SetsignUpInfo] = useState({
//         name:'',
//         email:'',
//         password:''
//     })
//     const handleChange = (e)=>{
//         const {name, value} = e.target;
//         console.log(name,value);
//         const copySignUpInfo = {...signUpInfo};
//         copySignUpInfo[name] = value;
//         SetsignUpInfo(copySignUpInfo);
//     }
//     console.log('loginInfo -> ',signUpInfo);
//     const handleSignup =(e)=>{
//         e.preventDefault();
//         const {name,email,password} = signUpInfo;
//         if(!name || !email || !password)
//     }
//     return (
        
// <div className={`wrapper${action}`}>
//     <div className="form-box register">
//     <h1>Registration</h1>
//             <form onSubmit={handleSignup} action="">
//                 <div className="input-box">
//                     <input onChange={handleChange}
//                     type="text" placeholder="Username" required/>
//                     <FaUser className="icon"
//                     value={signUpInfo.value}
//                     />
//                 </div>
//                 <div className="input-box">
//                     <input onChange={handleChange}type="email" placeholder="Email" required/>
//                     <FaEnvelope className="icon"
//                      value={signUpInfo.email}/>
//                 </div>
//                 <div className="input-box">
//                     <input onChange={handleChange} type="password" placeholder="Password" required/>
//                     <FaLock className="icon"
//                     value={signUpInfo.password}/>
//                 </div>

//                 <div className="remember-forgot">
//                     <label><input type="checkbox"/>I agree to terms & conditions</label>
//                 </div>
//                 <button type='submit'>Register</button>

//                 <div className="register-Link">
//                     <p>Already have an account</p>
//                     <Link to='/login' onClick={loginLink}>Login</Link>

//                 </div>
//             </form>
//         </div>
//     </div>
//     )
// }

// export default Signup;
import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [action, setAction] = useState('');
    const [signUpInfo, setSignUpInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const loginLink = () => {
        setAction('active');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setSignUpInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        
        try {
            const { name,  password,email } = signUpInfo;
            console.log(email);
            if (!name || !email || !password) return;
                console.log(signUpInfo)
             const  response = await axios.post('http://localhost:5000/api/signup', signUpInfo);
            alert(response.data.message);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.error); // Display Joi error message
            } else {
                console.log(error.response.data);
                alert(error.response.data.message);
                
            }
        }
    };

    return (
        <div className={`wrapper${action}`}>
            <div className="form-box register">
                <h1>Registration</h1>
                <form onSubmit={handleSignup}>
                    <div className="input-box">
                        <input name="name" onChange={handleChange} type="text" placeholder="Username" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input name="email" onChange={handleChange} type="email" placeholder="Email" required />
                        <FaEnvelope className="icon" />
                    </div>
                    <div className="input-box">
                        <input name="password" onChange={handleChange} type="password" placeholder="Password" required />
                        <FaLock className="icon" />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" />I agree to terms & conditions</label>
                    </div>
                    <button type='submit'>Register</button>
                    <div className="register-Link">
                        <p>Already have an account?</p>
                        <Link to='/login' onClick={loginLink} className='account'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
