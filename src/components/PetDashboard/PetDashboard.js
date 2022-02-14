import React, { useState, useEffect } from 'react';
import styles from './PetDashboard.module.css';
import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter'

function PetDashboard(props) {
    const [pets, setPets] = useState([])
    const url = `https://petfindr-api.herokuapp.com/pets/`;

    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((json) => {
            setPets(json)
        })
        .catch(console.error)
    }, [url]);

    if (!pets) {
        return <p>Loading pets looking for their home...</p>
    }

   
    return (
        <div>
            <Filter />
            <hr />
            <section className={styles.petsContainer}>
                {pets.map((pet) => (
                    <Link to={`/pets/${pet.id}`} className={styles.link}>
                        <div className={styles.petCard}>
                            <div className={styles.petImage}>
                                <img src={pet.photo} alt={pet.name} />
                            </div>
                            <div className={styles.cardTitle}>
                                <h3 className={styles.name}>{pet.name}</h3>
                                <h3 className={styles.status}>{pet.status}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    );
}

export default PetDashboard;