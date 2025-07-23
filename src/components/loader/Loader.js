import React from 'react';
import styles from './Loader.module.css';

const LoadingEffect = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heartContainer}>
        <div className={styles.heart}></div>
        <div className={styles.sparkle}></div>
        <div className={styles.sparkle} style={{ animationDelay: '0.4s' }}></div>
        <div className={styles.sparkle} style={{ animationDelay: '0.8s' }}></div>
      </div>
      <span className={styles.text}>טוען...</span>
    </div>
  );
};

export default LoadingEffect;