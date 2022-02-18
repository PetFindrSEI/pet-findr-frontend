// Dependencies
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Styles
import styles from './ReportPet.module.css';
// Framer Motion
import { motion } from 'framer-motion';
// Icons
import { BsFillPlusCircleFill } from 'react-icons/bs';

function ReportPet({ locationReportPet, loggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [amIloggedIn, setAmILoggedIn] = useState(false);

  // set a timeout for navigating to login if you are not logged in
  const redirecting = () => {
    if (loggedIn) {
      navigate('/report-pet');
      return;
    }
    setAmILoggedIn(true);
    setTimeout(() => {
      if (!loggedIn) {
        navigate('/login');
      }
    }, 2000);
  };

  // Reset the logged in check when the url location changes.
  useEffect(() => {
    return setAmILoggedIn(false);
  }, [location]);

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
          {amIloggedIn ? (
            <motion.div className={styles.reportPet}>
              <p>Redirecting to login page...</p>
            </motion.div>
          ) : (
            <motion.div
              className={styles.reportPet}
              onClick={redirecting}
              whileHover={{ backgroundColor: '#662EAC' }}
              whileTap={{ backgroundColor: '#A77CDE' }}>
              <BsFillPlusCircleFill />
              <p>Report Pet</p>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}

export default ReportPet;
