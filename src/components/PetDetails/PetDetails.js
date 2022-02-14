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
			<img src={pet.photo} alt={pet.name} />
		</div>
	);
}

export default PetDetails;
