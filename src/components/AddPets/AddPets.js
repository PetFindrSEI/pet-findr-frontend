import React, { useState } from 'react';
import styles from './AddPets.module.css';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { MdPhotoLibrary } from 'react-icons/md';

function AddPets(props) {
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
    photo: '',
    phone_number: '',
  });

  // Report New Pet
  const reportNewPet = () => {
    fetch(`https://petfindr-api.herokuapp.com/pets/`, {
      method: 'POST',
      body: JSON.stringify(newPet),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        navigate('/');
      });
  };

  // Handle Change
  const handleChange = (e) => {
    setNewPet({ ...newPet, [e.target.id]: e.target.value });
  };
  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    reportNewPet();
  };

  return (
    <div className={styles.reportContainer}>
      <h2>Report a Pet</h2>
      <form onSubmit={handleSubmit} className={styles.reportForm}>
        <label htmlFor='name'>
          <FiEdit className={styles.editIcon} />
        </label>
        <input
          type='text'
          id='name'
          onChange={handleChange}
          value={newPet.name}
          placeholder='Name'
          className={styles.name}
        />

        <div className={styles.photoContainer}>
          <label htmlFor='photo'>
            <MdPhotoLibrary className={styles.photoIcon} />
          </label>
          <input
            type='file'
            id='photo'
            onChange={handleChange}
            value={newPet.photo}
            className={styles.photo}
          />
        </div>
        {/* Options */}
        <div className={styles.options}>
          <label htmlFor='status'>
            Status:
            <select
              type='text'
              id='status'
              onChange={handleChange}
              value={newPet.status}>
              <option value='Lost'>Lost</option>
              <option value='Found'>Found</option>
            </select>
          </label>
          <label htmlFor='type'>
            Type:
            <select
              type='text'
              id='type'
              onChange={handleChange}
              value={newPet.type}>
              <option value='Dog'>Dog</option>
              <option value='Cat'>Cat</option>
              <option value='Other'>Other</option>
            </select>
          </label>
          <label htmlFor='gender'>
            Gender:
            <select
              type='text'
              id='gender'
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
              onChange={handleChange}
              value={newPet.size}>
              <option value='XS'>Extra Smol</option>
              <option value='S'>Smol</option>
              <option value='M'>Medium</option>
              <option value='L'>Large</option>
              <option value='XL'>Large Boi</option>
            </select>
          </label>
          <label htmlFor='microchip'>
            Microchip:
            <select
              type='text'
              id='microchip'
              onChange={handleChange}
              value={newPet.microchip}>
              <option value='Y'>Yes</option>
              <option value='N'>No</option>
              <option value='Uk'>Unknown</option>
            </select>
          </label>
        </div>

        <label htmlFor='color'>Color:</label>
        <input
          type='text'
          id='color'
          onChange={handleChange}
          value={newPet.color}
        />
        <label htmlFor='description'>Description:</label>
        <textarea
          type='text'
          id='description'
          onChange={handleChange}
          value={newPet.description}
          rows='15'
          cols='50'
        />
        <label htmlFor='location'>Location:</label>
        <input
          type='text'
          id='location'
          onChange={handleChange}
          value={newPet.location}
        />
        <label htmlFor='reported_time'>Reported Time:</label>
        <input
          type='date'
          id='reported_time'
          onChange={handleChange}
          value={newPet.reported_time}
        />

        <label htmlFor='phone_number'>
          Contact Number: <small>Format: 123-456-7890</small>
        </label>
        <input
          type='tel'
          id='phone_number'
          onChange={handleChange}
          value={newPet.phone_number}
          pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
        />
        <button
          type='submit'
          className={styles.submitBtn}>Report Pet</button>
      </form>
    </div>
  );
}

export default AddPets;
