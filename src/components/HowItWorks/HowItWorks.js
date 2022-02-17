import React from 'react';
import styles from './HowItWorks.module.css'

function HowItWorks(props) {
    return (
        <div className={styles.card}>
            <h2>How it works!</h2>
            <h3 className={styles.subTitle}>Create a free listing</h3>
            <p className={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
                dolorum, distinctio quas eius quo excepturi omnis quisquam, quibusdam
                impedit a dignissimos nostrum modi ducimus, fuga alias assumenda rem
                illum dolores.
            </p>
            <br />
            <h3 className={styles.subTitle}>Get in contact</h3>
            <p className={styles.description}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos neque
                sint alias at molestias cupiditate obcaecati. Facilis cumque
                perferendis quidem molestiae, dignissimos iste quibusdam ipsam
                temporibus et odit officia architecto?
            </p>
            <br />
            <h3 className={styles.subTitle}>Pet Reunion</h3>
            <p className={styles.description}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia iste
                quaerat voluptatibus veniam fugiat iusto voluptatum quis iure vel
                ipsam laudantium consequuntur corporis doloremque, porro obcaecati,
                nesciunt expedita sequi aliquid.
            </p>
        </div>
    );
}

export default HowItWorks;