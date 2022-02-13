import styles from './Navigation.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';

function Navigation(props) {
    const [navbarOpen, setNavbarOpen] = useState(false);

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen);
    };

	return (
		<nav className='navBar'>
			<Link to='/'>
				<h1>PetFindr</h1>
			</Link>
			<div className='hamburgerButtonDiv'>
				<button onClick={handleToggle}>
					{navbarOpen ? (
						<MdClose
							style={{ color: '#fff', width: '40px', height: '40px ' }}
						/>
					) : (
						<FiMenu
							style={{ color: '#383838', width: '40px', height: '40px' }}
						/>
					)}
				</button>
				<ul
					style={{ display: navbarOpen ? 'flex' : 'none' }}
					className='menuNav'>
					<li>
						Home
					</li>
					<li>
						Found Pets
					</li>
					<li>
						Lost Pets
					</li>
					<li>
						How it Works?
					</li>
					<li>
						Report a Pet
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navigation;
