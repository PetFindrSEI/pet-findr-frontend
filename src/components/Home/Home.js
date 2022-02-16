import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { FaPaw } from 'react-icons/fa';

import { motion } from 'framer-motion';
import FoundPetSlider from '../PetSlider/FoundPetSlider';
import foundPetImage from '../../assets/foundPetImage.jpg';
import lostPetImage from '../../assets/lostPetImage.jpg';
import LostPetSlider from '../PetSlider/LostPetSlider';

function Home({ loggedIn }) {
  const navigate = useNavigate();
  return (
    <div className={styles.homeContainer}>
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <h2>
            PetFindr
            <FaPaw className={styles.pawPeriod} />
          </h2>
          <h3>Lost or found, we're here to help your best friend.</h3>
        </div>
        {loggedIn ? (
          <div className={styles.heroInfoBox}>
            <h4>Start searching for pets in your area to see who you can help today!</h4>
            <motion.button
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ backgroundColor: '#854ad0', color: '#fff' }}
              whileTap={{ backgroundColor: '#fff' }}
              onClick={() => navigate('/dashboard')}>
              Dashboard
            </motion.button>
          </div>
        ) : (
          <div className={styles.heroInfoBox}>
            <h4>Login to start reuniting the lost animals in your area</h4>
            <motion.button
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ backgroundColor: '#854ad0', color: '#fff' }}
              whileTap={{ backgroundColor: '#fff' }}
              onClick={() => navigate('/login')}>
              Login
            </motion.button>
            <Link to='/register'>Register</Link>
          </div>
        )}
      </section>
      <section>
        <LostPetSlider />
      </section>
      <section className={styles.foundPetInfo}>
        <img src={foundPetImage} alt='Sad pets' />
        <div className={styles.foundPetTextBox}>
          <p>Found a lost pet? Share any info here to help find their owner.</p>
        </div>
      </section>
      <section>
        <FoundPetSlider />
      </section>
      <section className={styles.lostPetInfo}>
        <img src={lostPetImage} alt='lost pets' />
        <div className={styles.lostPetTextBox}>
          <p>
            Have you lost your pet? Share their info here to see if any other
            users have located them.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
