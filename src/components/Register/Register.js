import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import axios from 'axios';

function Register(props) {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    re_password: '',
  });

  const createNewUser = () => {
    axios
      .post(`https://petfindr-api.herokuapp.com/users/`, newUser)
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
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    createNewUser();
  };

  return (
    <div className={styles.registerContainer}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path
          fill='#854ad0'
          fillOpacity='1'
          d='M0,160L48,186.7C96,213,192,267,288,293.3C384,320,480,320,576,272C672,224,768,128,864,122.7C960,117,1056,203,1152,234.7C1248,267,1344,245,1392,234.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'></path>
      </svg>
      <div className={styles.registerBox}>
        <h2>Register a New Account</h2>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            placeholder='Username'
            autoComplete='off'
            value={newUser.username}
            onChange={handleChange}
          />

          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            placeholder='Email'
            autoComplete='off'
            value={newUser.email}
            onChange={handleChange}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            autoComplete='off'
            value={newUser.password}
            onChange={handleChange}
          />
          <label htmlFor='re_password'>Confirm Password</label>
          <input
            type='password'
            id='re_password'
            placeholder='Password'
            autoComplete='off'
            value={newUser.re_password}
            onChange={handleChange}
          />

          <button>Register</button>
        </form>
        <span>
          Already have an account? <Link to='/login'>Login here.</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
