import styles from './Navigation.module.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Hamburger Icon
import { Divide as Hamburger } from 'hamburger-react';
// Menu Icons
import { AiOutlineHome } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { BsFillExclamationDiamondFill } from 'react-icons/bs';
import { FiHelpCircle } from 'react-icons/fi';
import { GoReport } from 'react-icons/go';
import { FiLogOut } from 'react-icons/fi';
import { GoDashboard } from 'react-icons/go';
// Logo Icon
import { FaPaw } from 'react-icons/fa';
// Framer Motion
import { motion } from 'framer-motion';

function Navigation({ setPetStatus, loggedIn, handleLogout, userInfo }) {
  const urlLocation = useLocation();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  useEffect(() => {
    setNavbarOpen(false);
  }, [urlLocation]);

  return (
    <div>
      {/* Navigation bar */}
      <nav className={styles.navBar}>
        <h1>
          <Link to='/' className={styles.logo}>
            PetFindr
            <FaPaw className={styles.pawPeriod} />
          </Link>
        </h1>
        <div className={styles.buttonsArea}>
          <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}>
            {userInfo ? (
              <Link to='/user-profile'>{userInfo.username}</Link>
            ) : (
              <Link to='/login'>Login</Link>
            )}
          </motion.div>
          {/* Hamburger Button */}
          <motion.button
            onClick={handleToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <Hamburger
              toggled={navbarOpen}
              toggle={setNavbarOpen}
              size={20}
              className={styles.hamburger}
            />
          </motion.button>
        </div>
      </nav>
      {/* List of Links when menu is toggled */}
      <ul
        style={{ display: navbarOpen ? 'flex' : 'none' }}
        className={styles.menuNav}>
        {/* Home Link */}
        <motion.li whileHover={{ scale: 1.05 }}>
          <Link to='/'>
            <AiOutlineHome className={styles.icon} />
            Home
          </Link>
        </motion.li>

        <span></span>
        {/* Home Link */}
        <motion.li whileHover={{ scale: 1.05 }}>
          <Link
            to='/dashboard'
            onClick={() => {
              setPetStatus({});
            }}>
            <GoDashboard className={styles.icon} />
            Dashboard
          </Link>
        </motion.li>

        <span></span>
        {/* Found Pets Link */}
        <motion.li whileHover={{ scale: 1.05 }}>
          <Link
            to={`/dashboard`}
            onClick={() => {
              setPetStatus({ status: 'Found' });
            }}>
            <BiSearchAlt className={styles.icon} />
            Found Pets
          </Link>
        </motion.li>

        <span></span>
        {/* Lost Pets Link */}
        <motion.li whileHover={{ scale: 1.05 }}>
          <Link
            to={`/dashboard`}
            onClick={() => {
              setPetStatus({ status: 'Lost' });
            }}>
            <BsFillExclamationDiamondFill className={styles.icon} />
            Lost Pets
          </Link>
        </motion.li>

        <span></span>
        {/* How It Works Link */}
        <motion.li whileHover={{ scale: 1.05 }}>
          <Link to='/howitworks'>
            <FiHelpCircle className={styles.icon} />
            How it Works?
          </Link>
        </motion.li>

        <span></span>
        {/* Report a Pet Link */}
        <motion.li whileHover={{ scale: 1.05 }}>
          <Link to='/'>
            <GoReport className={styles.icon} />
            Report a Pet
          </Link>
        </motion.li>

        <span></span>
        {loggedIn ? (
          <motion.li whileHover={{ scale: 1.05 }}>
            <Link to='/' onClick={handleLogout}>
              <FiLogOut className={styles.icon} />
              Logout
            </Link>
          </motion.li>
        ) : (
          ''
        )}
      </ul>
    </div>
  );
}

export default Navigation;
