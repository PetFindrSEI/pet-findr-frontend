import React, { useState } from 'react';
import PetDashboard from '../PetDashboard/PetDashboard';
import { motion } from 'framer-motion';
import styles from './Filter.module.css';
import { BsChevronDown } from 'react-icons/bs';

function Filter({ petStatus, setPetStatus }) {
  const [menu, setMenu] = useState(false);

  const variants = {
    open: { opacity: 1, y: 0, display: 'block' },
    closed: { opacity: 0, y: '-20px', display: 'none' },
  };
  return (
    <div>
      <div className={styles.filterContainer}>
        <h3 onClick={() => setMenu(!menu)}>
          Filter Search <BsChevronDown />
        </h3>
        <motion.nav
          animate={!menu ? 'open' : 'closed'}
          variants={variants}
          className='filter_container'>
          <p>Status</p>
          <button
            onClick={() => {
              setPetStatus({ ...petStatus, status: 'Lost' });
            }}>
            Lost
          </button>
          <button
            onClick={() => {
              setPetStatus({ ...petStatus, status: 'Found' });
            }}>
            Found
          </button>
          <button
            onClick={() => {
              setPetStatus({ ...petStatus, gender: 'M' });
            }}>
            Male
          </button>
          <button
            onClick={() => {
              setPetStatus({ ...petStatus, gender: 'F' });
            }}>
            Female
          </button>
        </motion.nav>
      </div>
      {/* <PetDashboard petStatus={petStatus} /> */}
    </div>
  );
}

export default Filter;
