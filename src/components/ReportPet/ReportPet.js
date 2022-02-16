import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// Styles/Icons
import styles from './ReportPet.module.css';
import { BsFillPlusCircleFill } from 'react-icons/bs';

function ReportPet({ locationReportPet }) {
  return (
    <>
      {locationReportPet ? (
        <div className={styles.reportContainer}>
          <div className={styles.reportPetAlert}>
            <p>
              If you have found an injured animal, please call your local
              veterinarian.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.reportContainer}>
          <Link to='/report-pet'>
            <motion.div
              className={styles.reportPet}
              whileHover={{ backgroundColor: '#662EAC' }}
              whileTap={{ backgroundColor: '#A77CDE' }}>
              <BsFillPlusCircleFill />
              <p>Report Pet</p>
            </motion.div>
          </Link>
        </div>
      )}
    </>
  );
}

export default ReportPet;
