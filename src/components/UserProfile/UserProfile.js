import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Profiler } from 'react/cjs/react.production.min';

import styles from './UserProfile.module.css';

function UserProfile({ handleLogout, userInfo, loggedIn }) {
  const navigate = useNavigate();
  const [editingMode, setEditingMode] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, []);

  return (
    <div className={styles.profileContainer}>
      <h2>{userInfo?.username}'s PetFindr Profile</h2>

      {editingMode ? (
        <div className={styles.editingMode}>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            placeholder='Username'
            autoComplete='off'
            // value={user.email}
            // onChange={handleChange}
          />
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            placeholder='Email'
            autoComplete='off'
            // value={user.email}
            // onChange={handleChange}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            id='password'
            placeholder='Password'
            autoComplete='off'
            // value={user.email}
            // onChange={handleChange}
          />
          <label htmlFor='re_password'>Confirm Password</label>
          <input
            type='text'
            id='re_password'
            placeholder='Confirm Password'
            autoComplete='off'
            // value={user.email}
            // onChange={handleChange}
          />
        </div>
      ) : (
        <div>
          <ul>
            <li>Username: {userInfo?.username}</li>
            <li>Email Address: {userInfo?.email}</li>
          </ul>
        </div>
      )}

      {editingMode ? (
        <>
          <button onClick={() => setEditingMode(false)}>Save Changes</button>
          <button>Delete Account</button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              navigate('/dashboard');
            }}>
            My Reported Pets
          </button>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => setEditingMode(true)}>Edit Account</button>
        </>
      )}
    </div>
  );
}

export default UserProfile;
