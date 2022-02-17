// Dependencies
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../apiUrl';
import axios from 'axios';
// Styling
import styles from './UserProfile.module.css';

function UserProfile({ handleLogout, userInfo, loggedIn }) {
  const navigate = useNavigate();
  const [editingMode, setEditingMode] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState({});

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    console.log(userInfo);
    console.log(newUserInfo);
  }, [newUserInfo]);

  // // DELETE A USER
  // const deleteUser = (e) => {
  //   e.preventDefault();
  //   axios.delete(API_URL + 'users/me').then((res) => {
  //     console.log(res);
  //   });
  // };

  // EDIT USERNAME
  const editUsername = async (e) => {
    // e.preventDefault();
    try {
      const response = await fetch(
        API_URL + `users/set_${newUserInfo.username}/`,
        {
          method: 'POST',
          body: JSON.stringify(newUserInfo),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.status === 404 || response.status === 405) {
        console.log('something went wrong');
      } else {
        setEditingMode(false);
        setNewUserInfo({});
      }
    } catch (error) {
      console.log('Oh no!', error);
    }
  };

  // Handle Change
  const handleChange = (e) => {
    setNewUserInfo({ ...newUserInfo, [e.target.id]: e.target.value });
  };

  return (
    <div className={styles.profileContainer}>
      <h2>
        <span>{userInfo?.username}'s</span> PetFindr Profile
      </h2>

      {editingMode ? (
        <div className={styles.editingMode}>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            autoComplete='off'
            placeholder={userInfo.username}
            value={newUserInfo.username}
            onChange={handleChange}
          />
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            autoComplete='off'
            placeholder={userInfo.email}
            value={newUserInfo.email}
            onChange={handleChange}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            id='password'
            autoComplete='off'
            placeholder={userInfo.password}
            value={newUserInfo.password}
            onChange={handleChange}
          />
          <label htmlFor='re_password'>Confirm Password</label>
          <input
            type='text'
            id='re_password'
            autoComplete='off'
            // value={userInfo.re_password}
            // onChange={handleChange}
          />
        </div>
      ) : (
        <div className={styles.usersInfo}>
          <ul>
            <li>
              Username: <span>{userInfo?.username}</span>
            </li>
            <li>
              Email Address: <span>{userInfo?.email}</span>
            </li>
          </ul>
        </div>
      )}

      {editingMode ? (
        <div className={styles.editButtonsDiv}>
          <button onClick={() => setEditingMode(false)}>Cancel Changes</button>
          <button onClick={() => editUsername()}>Save Changes</button>
          <button>Delete Account</button>
        </div>
      ) : (
        <div className={styles.buttonDiv}>
          {/* <button
            onClick={() => {
              navigate('/dashboard');
            }}>
            My Reported Pets
          </button> */}
          <button
            onClick={() => {
              setEditingMode(true);
              setNewUserInfo({});
            }}>
            Edit Account
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
