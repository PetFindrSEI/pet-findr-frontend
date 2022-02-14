import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './PetDetails.module.css';

function PetDetails(props) {
	const [pet, setPet] = useState(null);
	const { id } = useParams();

    async function getPet() {
        const url = `https://petfindr-api.herokuapp.com/pets/${id}`;
        
        try {
            const res = await fetch(url);
            const resJson = await res.json();
            setPet(resJson);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getPet();
    }, []);
    
	if (!pet) {
		return <p>Loading pet details...</p>;
	}

	return (
		<div className={styles.detailsContainer}>
            <div>
                <h4 className={styles.status}>Status: {pet.status}</h4>
                <h3 className={styles.name}>{pet.name}</h3>
                <div className={styles.imgDiv}>
                    <img className={styles.img} src={pet.photo} alt={pet.name} />
                </div>
            </div>
            <h3>Pet Descriptors</h3>
            <hr />
            <ul>
                <li>Size: {pet.size}</li>
                <li>Type/Breed: {pet.type}</li>
                <li>Gender: {pet.gender}</li>
                <li>Color: {pet.color}</li>
            </ul>
            <p>Description: {pet.description}</p>
            <br />
            <h3>Location Info</h3>
            <hr />
            <ul>
                <li>Last Location: {pet.location}</li>
                <li>Date: {pet.reported_time}</li>
            </ul>
            <button>Contact</button>
		</div>
	);
}

export default PetDetails;
