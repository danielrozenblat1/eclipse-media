import React from 'react';
import styles from './Recommends.module.css';
import Button from '../button/Button';

// Import your images
import result1 from "../../images/אקליפס לוגו חברות 1.png";
import result2 from "../../images/אקליפס לוגו חברות 2.png";
import result3 from "../../images/אקליפס לוגו חברות 3.png";
import result4 from "../../images/אקליפס לוגו חברות 4.png";
import result5 from "../../images/אקליפס לוגו חברות 5.png";

import result6 from "../../images/אקליפס לוגו חברות 6.png";
import result7 from "../../images/אקליפס לוגו חברות 7.png";
import result8 from "../../images/אקליפס לוגו חברות 8.png";
import result9 from "../../images/אקליפס לוגו חברות 9.png";
import result10 from "../../images/אקליפס לוגו חברות 10.png";
import result11 from "../../images/אקליפס לוגו חברות 11.png";
import result12 from "../../images/אקליפס לוגו חברות 12.png";

const Works = () => {
  const images = [
  result1, result2, result3,  result4,  result5, result6, result7, result8, 
    result9, result10, result11, result12
  ];

  return (
    <>

   
      <div className={styles.container}>
        <div className={styles.scrollTrack}>
          {/* קבוצה ראשונה של תמונות */}
          <div className={styles.scrollContainer}>
            {images.map((img, index) => (
              <div key={`first-${index}`} className={styles.imageWrapper}>
                <img
                  src={img}
                  alt={`המלצה ${index + 1}`}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
          {/* קבוצה שנייה זהה של תמונות */}
          <div className={styles.scrollContainer}>
            {images.map((img, index) => (
              <div key={`second-${index}`} className={styles.imageWrapper}>
                <img
                  src={img}
                  alt={`המלצה ${index + 1}`}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default Works;