// Dependencies
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Styles
import styles from './AddPets.module.css';
// Framer Motion
import { motion } from 'framer-motion';
// API URL
import API_URL from '../../apiUrl';

function AddPets({ loggedIn, setRefreshingPet }) {
  const [notFilled, setNotFilled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const navigate = useNavigate();
  // newPet model that will be submitted to the API
  const [newPet, setNewPet] = useState({
    status: '',
    name: '',
    type: '',
    gender: '',
    size: '',
    color: '',
    description: '',
    microchip: '',
    location: '',
    reported_time: '',
    photo: null,
    phone_number: '',
  });

  // Report New Pet
  const reportNewPet = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    try {
      const response = await fetch(API_URL + 'pets/', {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 201) {
        const data = await response.json();
        setSuccess(true);
        setRefreshingPet(true);
        setTimeout(() => {
          navigate(`/pets/${data.id}`);
        }, 2000);
      }
      if (response.status !== 201) {
        setNotFilled(true);
      }
    } catch (error) {
      setErrMsg(error);
    }
  };

  // Handle Change
  const handleChange = (e) => {
    setNewPet({ ...newPet, [e.target.id]: e.target.value });
  };

  // If you're not logged in, navigate to the login page
  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
    return setRefreshingPet(false);
  }, []);

  // Framer Motion Variants
  const successful = {
    start: { y: '2rem', backgroundColor: '#13B279', opacity: 0 },
    end: { y: 0, backgroundColor: '#13B279', opacity: 1 },
  };

  return (
    <div className={styles.reportContainer}>
      <div className={styles.reportCard}>
        <h2>Report a Pet {errMsg}</h2>
        <form
          onSubmit={reportNewPet}
          className={styles.reportForm}
          encType='multipart/form-data'>
          <div className={styles.textInput}>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              onChange={handleChange}
              value={newPet.name}
              className={styles.name}
              autoFocus
              autoComplete='off'
            />
          </div>

          <div className={styles.petStatus}>
            <label htmlFor='status'>
              Status:
              <select
                type='text'
                id='status'
                name='status'
                onChange={handleChange}
                value={newPet.status}>
                <option value='Lost'>Lost</option>
                <option value='Found'>Found</option>
              </select>
            </label>
          </div>

          {/* Options */}
          <div className={styles.options}>
            <label htmlFor='type'>
              Type:
              <select
                type='text'
                id='type'
                name='type'
                onChange={handleChange}
                value={newPet.type}>
                <option value='Dog'>Dog</option>
                <option value='Cat'>Cat</option>
                <option value='Other'>Other</option>
              </select>
            </label>
            <label htmlFor='gender' className={styles.gender}>
              Gender:
              <select
                type='text'
                id='gender'
                name='gender'
                onChange={handleChange}
                value={newPet.gender}>
                <option value='M'>Male</option>
                <option value='F'>Female</option>
                <option value='Uk'>Unknown</option>
              </select>
            </label>
            <label htmlFor='size'>
              Size:
              <select
                type='text'
                id='size'
                name='size'
                onChange={handleChange}
                value={newPet.size}>
                <option value='XS'>Extra Smol</option>
                <option value='S'>Smol</option>
                <option value='M'>Medium</option>
                <option value='L'>Large</option>
                <option value='XL'>Large Boi</option>
              </select>
            </label>
            <label htmlFor='microchip' className={styles.microchip}>
              Microchip:
              <select
                type='text'
                id='microchip'
                name='microchip'
                onChange={handleChange}
                value={newPet.microchip}>
                <option value='Y'>Yes</option>
                <option value='N'>No</option>
                <option value='Uk'>Unknown</option>
              </select>
            </label>
          </div>

          <div className={styles.textInput}>
            <label htmlFor='color'>Color:</label>
            <input
              type='text'
              id='color'
              name='color'
              onChange={handleChange}
              value={newPet.color}
              autoComplete='off'
            />
          </div>

          <div className={styles.textArea}>
            <label htmlFor='description'>Description:</label>
            <textarea
              type='text'
              id='description'
              name='description'
              onChange={handleChange}
              value={newPet.description}
              rows='10'
              cols='50'
            />
          </div>

          <div className={styles.textInput}>
            <label htmlFor='location'>Location:</label>
            <input
              type='text'
              id='location'
              name='location'
              onChange={handleChange}
              value={newPet.location}
              autoComplete='off'
            />
          </div>

          <div>
            <label htmlFor='reported_time'>Reported Time:</label>
            <input
              type='date'
              id='reported_time'
              name='reported_time'
              onChange={handleChange}
              value={newPet.reported_time}
            />
          </div>

          <div className={styles.textInput}>
            <label htmlFor='phone_number' className={styles.phoneNumber}>
              Contact Number:
            </label>
            <input
              type='tel'
              id='phone_number'
              name='phone_number'
              onChange={handleChange}
              value={newPet.phone_number}
              pattern='[0-9]{3}[0-9]{3}[0-9]{4}'
              autoComplete='off'
            />
          </div>
          <small>(*Only enter numbers with no other symbols)</small>

          <div className={styles.photoContainer}>
            <label htmlFor='photo'>Photo:</label>
            <input
              type='file'
              id='photo'
              name='photo'
              accept='image/*'
              className={styles.photo}
            />
          </div>

          {notFilled ? (
            <p className={styles.notFilled}>
              Make sure all fields are filled out before submitting.
            </p>
          ) : (
            ''
          )}

          {success ? (
            <motion.input
              type='submit'
              value='Pet Reported!'
              variants={successful}
              initial='start'
              animate='end'
              layout
            />
          ) : (
            <motion.input
              type='submit'
              value='Report Pet'
              whileHover={{ backgroundColor: '#D29568' }}
              whileTap={{ backgroundColor: '#bb6b32' }}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default AddPets;
