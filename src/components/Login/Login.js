import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login(props) {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: 'test@test.com',
    password: 'petfindr',
  });

    const createNewUser = () => {
      axios
        .post(`https://petfindr-api.herokuapp.com/users/`, user)
        .then((res) => {
          res.json();
        })
        .then((res) => {
          console.log(res);
          navigate('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // Handle Change
    const handleChange = (e) => {
      setUser({ ...user, [e.target.id]: e.target.value });
    };

    // Handle Submit
    const handleSubmit = (e) => {
      e.preventDefault();
      createNewUser();
    };

  return (
    <div className={styles.loginContainer}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path
          fill='#13B279'
          fillOpacity='1'
          d='M0,160L48,186.7C96,213,192,267,288,293.3C384,320,480,320,576,272C672,224,768,128,864,122.7C960,117,1056,203,1152,234.7C1248,267,1344,245,1392,234.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'></path>
      </svg>
      <div className={styles.loginBox}>
        <h2>Welcome Back!</h2>
        <form className={styles.loginForm}>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            placeholder='Email'
            autoComplete='off'
            // value={registered.username}
            // onChange={handleChange}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            autoComplete='off'
            // value={registered.username}
            // onChange={handleChange}
          />

          <button>Login</button>
        </form>
        <span>
          Don't have an account? <Link to='/register'>Register here.</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
