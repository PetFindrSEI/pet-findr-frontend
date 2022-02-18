import React from 'react';
import styles from './HowItWorks.module.css';

function HowItWorks(props) {
  return (
    <div className={styles.card}>
      <h2>How it works!</h2>
      <h3 className={styles.subTitle}>Create a free listing</h3>
      <p className={styles.description}>
        Oh no! Otto just bolted out of the backdoor and you can't seem to find
        him! Don't worry. You can easily log in to PetFindr and report Otto as
        'Lost', and with the help of your community, other users will see your
        post and keep an eye out for him! Once a user has found Otto, they can
        easily contact you from the details page. On the other hand, if you
        happen to found a lost pet, you can alternatively report a pet as
        'Found' and share what information you have so, soon, you can reunite
        the furry friend with their owner!
      </p>
      <br />
      <h3 className={styles.subTitle}>Get in contact</h3>
      <p className={styles.description}>
        Each reported pet, whether lost or found, has a contact button which
        will show the contact information of the user that reported the pet. You
        can pick up the phone and call them, or shoot them an email if you have
        found their lost pet!
      </p>
      <br />
      <h3 className={styles.subTitle}>Pet Reunion</h3>
      <p className={styles.description}>
        When reuniting a pet with their owner, decide on a mutually agreed upon
        time and location. Deliver the pet in a safe, pet-friendly manner and
        reunite them with their owner! We ask that you do not hold any animals
        hostage and/or demand a random or a finders fee from the owner upon
        reunion.
      </p>
    </div>
  );
}

export default HowItWorks;
