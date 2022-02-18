// Dependencies
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// Styling
import styles from './PetDashboard.module.css';
// Framer Motion
import { motion, AnimatePresence } from 'framer-motion';
// Moment (for the time)
import moment from 'moment';
// Components
import Filter from '../Filter/Filter';

function PetDashboard({
  petStatus,
  setPetStatus,
  pets,
  filtered,
  setFiltered,
}) {
  // Filter the results based on the search parameters (Thanks Tyler!)
  useEffect(() => {
    const results = pets.filter((item) => {
      for (let key in petStatus) {
        if (item[key] !== petStatus[key]) {
          return false;
        }
      }
      return true;
    });
    setFiltered(results);
  }, [petStatus, pets, setFiltered]);

  if (pets.length === 0) {
    return (
      <div className={styles.nothingFound}>
        <h2>Loading pets looking for their home...</h2>
      </div>
    );
  }

  return (
    <div>
      <Filter petStatus={petStatus} setPetStatus={setPetStatus} />
      <motion.div layout className={styles.petsContainer}>
        {filtered.length === 0 ? (
          <div className={styles.nothingFound}>
            <h2>No pets found with those parameters</h2>
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map((pet) => (
              <motion.div
                layout
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className={styles.petCard}
                key={pet.id}>
                <Link to={`/pets/${pet.id}`} className={styles.link}>
                  <div className={styles.petImage}>
                    <img src={pet?.photo} alt={pet?.name} />
                  </div>
                  <div className={styles.cardTitle}>
                    <h3 className={styles.name}>{pet?.name}</h3>
                    <h3 className={styles.status}>{pet?.status}</h3>
                  </div>
                  <div className={styles.infoContainer}>
                    <p>
                      {pet?.type} - {pet?.gender}
                    </p>
                    <p>Location: {pet?.location}</p>
                    <p>
                      Reported Date: {moment(pet.reported_time).format('ll')}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
}

export default PetDashboard;
