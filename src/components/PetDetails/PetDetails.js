import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './PetDetails.module.css';

function PetDetails(props) {
	const [pet, setPet] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		fetch(`https://petfindr-api.herokuapp.com/pets/${id}`)
			.then((data) => {
				data.json();
				console.log(data);
			})
			.then((json) => {
				setPet(json);
			})
			.catch(console.error);
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
