import React from 'react';
import styles from './What.module.css';

const Row = ({ title, description, imageSrc, imageRight }) => (
  <div className={`${styles.row} ${imageRight ? styles.rowRight : styles.rowLeft}`}>
    <div className={styles.imageContainer}>
      <img src={imageSrc} alt={title} className={styles.image} />
    </div>
    <div className={`${styles.content} ${imageRight ? styles.rightAligned : styles.leftAligned}`}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  </div>
);

const TripleRowColumn = ({ rows }) => (
  <div className={styles.column}>
    {rows.map((row, index) => (
      <Row key={index} {...row} imageRight={index === 1} />
    ))}
  </div>
);

export default TripleRowColumn;