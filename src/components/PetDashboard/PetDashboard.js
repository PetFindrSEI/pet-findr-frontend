import React, { useState, useEffect } from 'react';
import styles from './PetDashboard.module.css';
import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter';

function PetDashboard({
  petStatus,
  setPetStatus,
  pets,
  filtered,
  setFiltered,
}) {
  const filterResults = () => {
    // if (petStatus.status === 'Found') {
    //   const results = pets.filter((item) => item.status.includes('Found'));
    //   setFiltered(results);
    // }
    // if (petStatus.status === 'Lost') {
    //   const results = pets.filter((item) => item.status.includes('Lost'));
    //   setFiltered(results);
    // }
    // return;
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
      <hr />
      <section className={styles.petsContainer}>
        {filtered.map((pet) => (
          <div className={styles.petCard} key={pet.id}>
            <Link to={`/pets/${pet.id}`} className={styles.link}>
              <div className={styles.petImage}>
                <img src={pet.photo} alt={pet.name} />
              </div>
              <div className={styles.cardTitle}>
                <h3 className={styles.name}>{pet.name}</h3>
                <h3 className={styles.status}>{pet.status}</h3>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}

export default PetDashboard;
