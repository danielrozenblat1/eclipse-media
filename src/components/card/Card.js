import React from 'react';
import Button from '../button/Button';
import styles from './Card.module.css';

const Card = ({ title, imageUrl, description }) => {
  return (
    <div className={styles.infoBox}>
      <h2 className={styles.title}>{title}</h2>
      <img src={imageUrl} alt={title} className={styles.image} />
      <p className={styles.description}>{description}</p>
      <Button text="לעוד מידע" message="היי סוזנה התרשמתי מהתפריט שלך אשמח לקבל פרטים נוספים" />
    </div>
  );
};

export default Card;