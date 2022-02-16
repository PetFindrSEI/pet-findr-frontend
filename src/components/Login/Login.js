import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../apiUrl';

function Login({ handleSetLoggedIn }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [errMsg, setErrMsg] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL + 'token/login/', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        handleSetLoggedIn(data.auth_token);
        navigate('/');
      }
      if (response.status !== 200) {
        setErrMsg(true);
      }
    } catch (error) {
      setErrMsg(true);
    }
  };

  // Handle Change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  return (
    <div className={styles.loginContainer}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path
          fill='#8DC941'
          fillOpacity='1'
          d='M0,160L48,186.7C96,213,192,267,288,293.3C384,320,480,320,576,272C672,224,768,128,864,122.7C960,117,1056,203,1152,234.7C1248,267,1344,245,1392,234.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'></path>
      </svg>
      <div className={styles.loginBox}>
        <h2>Welcome Back!</h2>
        <form className={styles.loginForm} onSubmit={loginUser}>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            placeholder='Email'
            autoComplete='off'
            value={user.email}
            onChange={handleChange}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            autoComplete='off'
            value={user.password}
            onChange={handleChange}
          />
          {errMsg ? (
            <small className={styles.errMsg}>
              The email or password entered did not match
            </small>
          ) : (
            ''
          )}
          <button type='submit'>Login</button>
        </form>
        <span>
          Don't have an account? <Link to='/register'>Register here.</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
