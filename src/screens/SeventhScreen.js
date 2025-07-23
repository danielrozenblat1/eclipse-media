import { useEffect } from 'react';
import styles from "./SeventhScreen.module.css";
import FAQItem from '../components/questions/Questions';
import Works from '../components/recommends/Works';
import Faces from '../components/recommends/Faces';
import article from "../images/כתבה אקליפס.png"
const SeventhScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>As Seen In</div>
    
      <div className={styles.imageContainer}>
        <a 
          href="https://www.geektime.co.il/how-to-take-the-perfect-linkedin-picture/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.imageLink}
        >
          <div className={styles.imageFrame}>
            <img 
              src={article} 
              alt="GeekTime Article" 
              className={styles.image}
            />
          </div>
        </a>
        
      </div>
      <div className={styles.description}>click on the image to read more</div>
      <div className={styles.title}>Some Of Our Previous Projects</div>
      <Faces/>
      
      <div className={styles.title}>Trusted By</div>
      <Works/>
    </div>
  );
};

export default SeventhScreen;