import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const {login} = useAuth()
  

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password }
      );
      if(response.data.success) {
        login(response.data.user)
        localStorage.setItem('token', response.data.token)
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <div className="box">
        <h1>Login
        </h1>


        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </div>

          <div>
            <button className="btn btn-action" type="submit">
              Login
            </button>
          </div>

          <p>
            Don't have an account? <Link to='/signup'>Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

