// Dependencies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Styles
import styles from './PetSlider.module.css';

function LostPetSlider({ setPetStatus }) {
  const [pets, setPets] = useState([]);

  // Get all pets
  useEffect(() => {
    getPets();
  }, []);

  async function getPets() {
    const url = `https://petfindr-api.herokuapp.com/pets/found`;
    const res = await fetch(url);
    const resJson = await res.json();
    setPets(resJson);
  }

  if (!pets) {
    return <p>Loading lost pets ...</p>;
  }

  // Shuffle the pets so it's a new set every mount
  let shuffledPets = pets.map((a) => ({ ...a }));
  let shuffled = shuffledPets.sort(() => Math.random() - Math.random());

  return (
    <section className={styles.petsContainer}>
      {shuffled.slice(0, 10).map((pet) => (
        <div className={styles.petCard} key={pet.id}>
          <Link to={`/pets/${pet.id}`} className={styles.link}>
            <div className={styles.petImage}>
              <img src={pet.photo} alt={pet.name} />
            </div>
            <div className={styles.cardTitle}>
              <h3 className={styles.name}>{pet.name}</h3>
              <h3 className={styles.statusFound}>{pet.status}</h3>
            </div>
          </Link>
        </div>
      ))}
      <Link
        to={`/dashboard`}
        className={styles.linkFound}
        onClick={() => {
          setPetStatus({ status: 'Found' });
        }}>
        <div className={styles.endCard}>
          <p>See all found pets</p>
        </div>
      </Link>
    </section>
  );
}

export default LostPetSlider;
