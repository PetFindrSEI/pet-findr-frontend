import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { motion } from 'framer-motion';
import PetSlider from '../PetSlider/PetSlider';
import foundPetImage from '../../assets/foundPetImage.jpg';
import lostPetImage from '../../assets/lostPetImage.jpg';

function Home(props) {
  const navigate = useNavigate();
  return (
    <div className={styles.homeContainer}>
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <h2>PetFindr</h2>
          <h3>Lost or found, we can help your best friend.</h3>
        </div>
        <div className={styles.heroInfoBox}>
          <h4>Login to start reuniting the lost animals in your area</h4>
          <motion.button
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ backgroundColor: '#854ad0', color: 'white' }}
            whileTap={{ backgroundColor: '#a87cdf' }}
            onClick={() => navigate('/login')}>
            Login
          </motion.button>
          <Link to='/register'>Register</Link>
        </div>
      </section>
      <section>
        <PetSlider />
      </section>
      <section className={styles.foundPetInfo}>
        <img src={foundPetImage} alt='Sad pets' />
        <div className={styles.foundPetTextBox}>
          <p>Found a lost pet? Share any info here to help find their owner.</p>
        </div>
      </section>
      <section>
        <PetSlider />
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
