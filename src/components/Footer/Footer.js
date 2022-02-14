import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

function Footer(props) {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerTextArea}>
        <section className={styles.footerSiteInfo}>
          <p>Pets</p>
          <ul>
            <li>
              <Link to='/'>Lost</Link>
            </li>
            <li>
              <Link to='/'>Found</Link>
            </li>
            <li>
              <Link to='/'>Learn More</Link>
            </li>
          </ul>
        </section>
        <section className={styles.footerCreatorInfo}>
          <p>Creators</p>
          <div className={styles.creators}>
            <ul>
              <li>Melissa Morgan</li>
              <li>
                <a
                  href='https://www.linkedin.com/in/melissa-morgan/'
                  target='_blank'
                  rel='noopener noreferrer'>
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/melissamorganc'
                  target='_blank'
                  rel='noopener noreferrer'>
                  GitHub
                </a>
              </li>
            </ul>
            <ul>
              <li>Landon Spell</li>
              <li>
                <a
                  href='https://www.linkedin.com/in/landon-spell/'
                  target='_blank'
                  rel='noopener noreferrer'>
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/spell-landon'
                  target='_blank'
                  rel='noopener noreferrer'>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <span>Deployed with Netlify and Heroku</span>
    </div>
  );
}

export default Footer;
