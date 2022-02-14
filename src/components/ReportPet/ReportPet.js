import React from 'react';
import styles from './ReportPet.module.css';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function ReportPet(props) {
  return (
    <div className={styles.reportContainer}>
      <Link to='/report-pet'>
        <motion.div
          className={styles.reportPet}
          whileHover={{ backgroundColor: '#6001db' }}
          whileTap={{ backgroundColor: '#7122d8' }}>
          <BsFillPlusCircleFill />
          <p>Report Pet</p>
        </motion.div>
      </Link>
    </div>
  );
}

export default ReportPet;
