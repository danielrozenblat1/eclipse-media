import React, { useEffect, useRef } from 'react';
import { Player } from '@lordicon/react';
import ScrollReveal from "scrollreveal";
import styles from './NewCan.module.css';

const IconTextComponentNew = ({ text, icon }) => {
    const playerRef = useRef(null);
    
    useEffect(() => {
      playerRef?.current?.playFromBeginning();
    }, []);
    
    useEffect(() => {
      ScrollReveal().reveal(`.${styles.iconWrapper}`, {
        duration: 1200,
        distance: "50px",
        origin: "right",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        reset: false,
        viewFactor: 0.2,
        interval: 300,
        delay: 200,
        scale: 0.95,
      });
    }, []);
  
    const handleComplete = () => {
      setTimeout(() => {
        playerRef?.current?.playFromBeginning();
      }, 3000);
    };
  
    return (
      <div className={styles.containerOuter}>
        <div className={styles.container}>
          <div className={styles.glowOverlay}></div>
          <div className={styles.content}>
            <div className={styles.iconWrapper}>
              <div className={styles.iconBackground}></div>
              <Player 
                icon={icon} 
                ref={playerRef} 
                size="100%" 
                onComplete={handleComplete}
                className={styles.icon}
              />
            </div>
            <p className={styles.text}>{text}</p>
          </div>
        </div>
      </div>
    );
  };

export default IconTextComponentNew;