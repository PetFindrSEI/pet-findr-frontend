import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Filter.module.css';
import { BsChevronDown } from 'react-icons/bs';
import { BsChevronUp } from 'react-icons/bs';

function Filter({ petStatus, setPetStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false);
    return setIsOpen(false);
  }, []);

  const variants = {
    open: {
      x: 0,
      height: 'fit-content',
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
      marginTop: '1rem',
    },
    closed: {
      x: -1000,
      height: 0,
      opacity: 0,
      transition: {
        y: { stiffness: 1000},
      },
      marginTop: '0rem',
    },
  };

  return (
    <div>
      <div className={styles.filterContainer}>
        <h3 onClick={() => setIsOpen(!isOpen)}>
          Filter Search{' '}
          {!isOpen ? (
            <BsChevronDown className={styles.icon} />
          ) : (
            <BsChevronUp className={styles.icon} />
          )}
        </h3>
        <motion.nav
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={variants}
          className='motion_nav'>
          <div>
            <p>Status</p>
            <button
              className={petStatus.status === 'Lost' ? 'active' : ''}
              onClick={() => {
                setPetStatus({ ...petStatus, status: 'Lost' });
                console.log(petStatus.status);
              }}>
              Lost
            </button>
            <button
              className={petStatus.status === 'Found' ? 'active' : ''}
              onClick={() => {
                setPetStatus({ ...petStatus, status: 'Found' });
              }}>
              Found
            </button>
          </div>

          <div>
            <p>Gender</p>
            <button
              className={petStatus.gender === 'F' ? 'active' : ''}
              onClick={() => {
                setPetStatus({ ...petStatus, gender: 'F' });
              }}>
              Female
            </button>
            <button
              className={petStatus.gender === 'M' ? 'active' : ''}
              onClick={() => {
                setPetStatus({ ...petStatus, gender: 'M' });
              }}>
              Male
            </button>
            <button
              className={petStatus.gender === 'Uk' ? 'active' : ''}
              onClick={() => {
                setPetStatus({ ...petStatus, gender: 'Uk' });
              }}>
              Unknown
            </button>
          </div>

          <div>
            <p>Type</p>
            <button
              className={petStatus.type === 'Cat' ? 'active' : ''}
              onClick={() => {
                setPetStatus({ ...petStatus, type: 'Cat' });
              }}>
              Cats
            </button>
            <button
              className={petStatus.type === 'Dog' ? 'active' : ''}
              onClick={() => {
                setPetStatus({ ...petStatus, type: 'Dog' });
              }}>
              Dogs
            </button>
            <button
              className={petStatus.type === 'Other' ? 'active' : ''}
              onClick={() => {
                setPetStatus({ ...petStatus, type: 'Other' });
              }}>
              Other
            </button>
          </div>

          <div>
            <p>Size</p>
            <button
              className={petStatus.size === 'XS' ? 'active' : ''}
              onClick={() => {
                setPetStatus({ ...petStatus, size: 'XS' });
              }}>
              Extra Small
            </button>
            <button
              className={petStatus.size === 'S' ? 'active' : ''}
              onClick={() => {
                setPetStatus({ ...petStatus, size: 'S' });
              }}>
              Small
            </button>
            <button
              className={petStatus.size === 'M' ? 'active' : ''}
              onClick={() => {
                setPetStatus({ ...petStatus, size: 'M' });
              }}>
              Medium
            </button>
            <button
              className={petStatus.size === 'L' ? 'active' : ''}
              onClick={() => {
                setPetStatus({ ...petStatus, size: 'L' });
              }}>
              Large
            </button>
            <button
              className={petStatus.size === 'XL' ? 'active' : ''}
              onClick={() => {
                setPetStatus({ ...petStatus, size: 'XL' });
              }}>
              Extra Large
            </button>
          </div>

          <div>
            <p>Microchip</p>
            <button
              className={petStatus.microchip === 'Y' ? 'active' : ''}
              onClick={() => {
                setPetStatus({ ...petStatus, microchip: 'Y' });
              }}>
              Yes
            </button>
            <button
              className={petStatus.microchip === 'N' ? 'active' : ''}
              onClick={() => {
                setPetStatus({ ...petStatus, microchip: 'N' });
              }}>
              No
            </button>
            <button
              className={petStatus.microchip === 'Uk' ? 'active' : ''}
              onClick={() => {
                setPetStatus({ ...petStatus, microchip: 'Uk' });
              }}>
              Unknown
            </button>
          </div>

          <div className={styles.clearFilters}>
            <motion.button
              onClick={() => {
                setPetStatus({});
              }}
              whileHover={{
                backgroundColor: '#fff',
                color: '#854ad0',
              }}>
              Clear Filters
            </motion.button>
          </div>
        </motion.nav>
      </div>
    </div>
  );
}

export default Filter;
