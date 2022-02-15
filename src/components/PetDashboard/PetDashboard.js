import React, { useState, useEffect } from 'react';
import styles from './PetDashboard.module.css';
import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter';

function PetDashboard({ petStatus }) {
  const [pets, setPets] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const url = `https://petfindr-api.herokuapp.com/pets/`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setPets(json);

        if (petStatus.status === 'Found') {
          const filteredFound = json.filter((foundPet) =>
            foundPet.status.includes('Found')
          );
          setFiltered(filteredFound);
        } else if (petStatus.status === 'Lost') {
          const filteredFound = json.filter((lostPet) =>
            lostPet.status.includes('Lost')
          );
          setFiltered(filteredFound);
        } else if (petStatus.status === '') {
          setFiltered(json);
        }
      })
      .catch(console.error);
  }, [url, petStatus.status]);

  if (!pets) {
    return <p>Loading pets looking for their home...</p>;
  }

  return (
    <div>
      <Filter />
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
