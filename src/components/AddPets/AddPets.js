import React, { useEffect, useState } from 'react';
import styles from './AddPets.module.css';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { MdPhotoLibrary } from 'react-icons/md';
import API_URL from '../../apiUrl';
import { FaPaw } from 'react-icons/fa';
import { motion } from 'framer-motion';

function AddPets({ loggedIn }) {
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
      console.log(response);
      if (response.status === 201) {
        const data = await response.json();
        navigate(`/pets/${data.id}`);
        console.log('Success', response);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  // Handle Change
  const handleChange = (e) => {
    setNewPet({ ...newPet, [e.target.id]: e.target.value });
    console.log(newPet);
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, []);

  return (
    <div className={styles.reportContainer}>
      <div className={styles.reportCard}>
        <h2>Report a Pet</h2>
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
              cols='10'
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
              pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
              placeholder='xxx-xxx-xxxx'
            />
          </div>

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
          <motion.input
            type='submit'
            value='Report Pet'
            whileHover={{ backgroundColor: '#bb6b32' }}
            whileTap={{ backgroundColor: '#d37d40' }}
          />
        </form>
      </div>
    </div>
  );
}

export default AddPets;
