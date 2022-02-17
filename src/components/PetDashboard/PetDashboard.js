// Dependencies
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// Styling
import styles from './PetDashboard.module.css';
import { motion, AnimatePresence } from 'framer-motion';
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
  const filterResults = () => {
    const results = pets.filter((item) => {
      for (let key in petStatus) {
        if (item[key] !== petStatus[key]) {
          return false;
        }
      }
      return true;
    });
    setFiltered(results);
  };

  useEffect(() => {
    filterResults();
    console.log(petStatus);
  }, [petStatus]);

  if (!pets) {
    return <p>Loading pets looking for their home...</p>;
  }

  return (
		<div>
			<Filter petStatus={petStatus} setPetStatus={setPetStatus} />
			<motion.div layout className={styles.petsContainer}>
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
			</motion.div>
		</div>
	);
}

export default PetDashboard;
