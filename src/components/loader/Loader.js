import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ text = "LOADING...", scale = 2 }) => {
  const letters = text.split('');

  return (
    <div className={styles.loaderWrapper} style={{ transform: `scale(${scale})` }}>
      {letters.map((letter, index) => (
        <span 
          key={index} 
          className={styles.loaderLetter}
          style={{ animationDelay: `${0.1 + index * 0.105}s` }}
        >
          {letter}
        </span>
      ))}
      <div className={styles.loader}>
        <div className={styles.loaderAfter}></div>
      </div>
    </div>
  );
};

export default Loader;