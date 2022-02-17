import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PetSlider.module.css';

function LostPetSlider({ setPetStatus}) {
	const [pets, setPets] = useState([]);

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

	return (
    <section className={styles.petsContainer}>
      {pets.slice(0, 6).map((pet) => (
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
      <div className={styles.endCard}>
        <Link
          to={`/dashboard`}
          className={styles.linkAll}
          onClick={() => {
            setPetStatus({ status: 'Found' });
          }}>
          See all found pets
        </Link>
      </div>
    </section>
  );
}

export default LostPetSlider;
