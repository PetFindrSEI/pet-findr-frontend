import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import {
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	EmailShareButton
} from 'react-share';
import {
	FacebookIcon,
	TwitterIcon,
} from 'react-share';
import styles from './PetDetails.module.css';
import moment from 'moment';
import Modal from 'react-modal';
import email from '../../assets/email.png'
import whatsapp from '../../assets/whatsapp.png'

// Modal error message
Modal.setAppElement('#root');

function PetDetails({ refreshingPet, setRefreshingPet, userInfo, loggedIn }) {
	const [pet, setPet] = useState(null);
	const { id } = useParams();
	const [modalIsOpen, setModalIsOpen] = useState(false);
	// const [remove, setRemove] = useState();
	const url = `https://petfindr-api.herokuapp.com/pets/${id}`;
	const navigate = useNavigate();


	async function getPet() {
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
		return setRefreshingPet(false);
	}, []);

	const deletePet = async () => {
		const response = await fetch(url, {
			method: `DELETE`,
			headers: {
				Authorization: `Token ${localStorage.getItem(`token`)}`,
			},
		});
		if (response.status === 204) {
			setRefreshingPet(true);
			setTimeout(() => {
				navigate(`/dashboard`);
			}, 1000);
		} else {
			console.error();
		}
	};

	if (!pet) {
		return <p>Loading pet details...</p>;
	}

	return (
		<div className={styles.detailsContainer}>
			<div className={styles.detailsCard}>
				<div className={styles.header}>
					<h3 className={styles.name}>{pet.name}</h3>
					<h4 className={styles.status}>Status: {pet.status}</h4>
				</div>
				<div className={styles.imgDiv}>
					<img className={styles.img} src={pet.photo} alt={pet.name} />
				</div>
				<h3>Pet Descriptors</h3>
				<hr />
				<ul>
					<li>
						Size: <p className={styles.text}>{pet.size}</p>
					</li>
					<li>
						Type/Breed: <p className={styles.text}>{pet.type}</p>
					</li>
					<li>
						Gender: <p className={styles.text}>{pet.gender}</p>
					</li>
					<li>
						Color: <p className={styles.text}>{pet.color}</p>
					</li>
				</ul>
				<p className={styles.description}>
					Description: <p className={styles.text}>{pet.description}</p>
				</p>
				<br />
				<h3>Location Info</h3>
				<hr />
				<ul>
					<li>
						Last Location: <p className={styles.text}>{pet.location}</p>
					</li>
					<li>
						Date:{' '}
						<p className={styles.text}>
							{moment(pet.reported_time).format('LLL')}
						</p>
					</li>
				</ul>
				<div className={styles.buttons}>
					<button
						onClick={() => setModalIsOpen(true)}
						className={styles.contact}>
						Contact
					</button>
					{loggedIn && pet.owner_email === userInfo.email ? (
						<button onClick={() => deletePet()} className={styles.contact}>
							Delete
						</button>
					) : (
						''
					)}
				</div>
				<div className={styles.modalDiv}>
					<Modal
						isOpen={modalIsOpen}
						onRequestClose={() => setModalIsOpen(false)}
						style={{
							overlay: {
								position: 'fixed',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: 'rgba(255, 255, 255, 0.75)',
							},
							content: {
								position: 'absolute',
								top: '20%',
								left: '28%',
								right: '28%',
								bottom: '42%',
								border: '1px solid #ccc',
								background: '#fff',
								overflow: 'auto',
								WebkitOverflowScrolling: 'touch',
								borderRadius: '10px',
								outline: 'none',
								padding: '20px',
								boxShadow:
									'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
								// shadowColor: '#005',
								// shadowOffset: {
								// 	width: 0,
								// 	height: 10,
								// },
								// shadowOpacity: 0.12,
								// shadowRadius: 60,
							},
						}}>
						<div className={styles.popUp}>
							<h2 className={styles.modalTitle}>Contact Info</h2>
							<h4 className={styles.subhead}>Phone Number: </h4>
							<p className={styles.modalItem}>{pet.phone_number}</p>
							<h4 className={styles.subhead}>Email: </h4>
							<p className={styles.modalItem}>{pet.owner_email}</p>
							<div className={styles.buttons}>
								<button
									className={styles.contact}
									onClick={() => setModalIsOpen(false)}>
									Close
								</button>
							</div>
						</div>
					</Modal>
					<h5>Share this pet profile!</h5>
					<br />
					<div className={styles.socialButtons}>
						<FacebookShareButton
							url={`https://petfindr.netlify.app/pets/${id}`}>
							<FacebookIcon className={styles.socialIcon} size={38} round />
						</FacebookShareButton>
						<TwitterShareButton url={`https://petfindr.netlify.app/pets/${id}`}>
							<TwitterIcon className={styles.socialIcon} size={38} round />
						</TwitterShareButton>
						<EmailShareButton url={`https://petfindr.netlify.app/pets/${id}`}>
							<img
								src={email}
								alt='Send Email Button'
								className={styles.socialIcon}
							/>
						</EmailShareButton>
						<WhatsappShareButton
							url={`https://petfindr.netlify.app/pets/${id}`}>
							<img
								src={whatsapp}
								alt='Send Email Button'
								className={styles.socialIcon}
							/>
						</WhatsappShareButton>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PetDetails;
