import React, { useState } from 'react';
import styles from './Faces.module.css';
import Button from '../button/Button';

// Import your images - first set
import result1 from "../../images/אקליפס פרצופים מוכרים 1.png";
import result2 from "../../images/אקליפס פרצופים מוכרים 2.png";
import result3 from "../../images/אקליפס פרצופים מוכרים 3.png";
import result4 from "../../images/אקליפס פרצופים מוכרים 4.png";
import result5 from "../../images/אקליפס פרצופים מוכרים 5.png";
import result6 from "../../images/אקליפס פרצופים מוכרים 6.png";
import result7 from "../../images/אקליפס פרצופים מוכרים 7.png";
import result8 from "../../images/אקליפס פרצופים מוכרים 8.png";
import result9 from "../../images/אקליפס פרצופים מוכרים 9.png";
import result10 from "../../images/אקליפס פרצופים מוכרים 10.png";
import result11 from "../../images/אקליפס פרצופים מוכרים 11.png";
import result12 from "../../images/אקליפס פרצופים מוכרים 12.png";

// Import your images - second set
import newFace1 from "../../images/אקליפס פרצופים קרוסלה שנייה 1.png";
import newFace2 from "../../images/אקליפס פרצופים קרוסלה שנייה 2.png";
import newFace3 from "../../images/אקליפס פרצופים קרוסלה שנייה 3.png";
import newFace4 from "../../images/אקליפס פרצופים קרוסלה שנייה 4.png";
import newFace5 from "../../images/אקליפס פרצופים קרוסלה שנייה 5.png";
import newFace6 from "../../images/אקליפס פרצופים קרוסלה שנייה 6.png";
import newFace7 from "../../images/אקליפס פרצופים קרוסלה שנייה 7.png";
import newFace8 from "../../images/אקליפס פרצופים קרוסלה שנייה 8.png";
import newFace9 from "../../images/אקליפס פרצופים קרוסלה שנייה 9.png";
import newFace10 from "../../images/אקליפס פרצופים קרוסלה שנייה 10.png";
import ScrollVelocity from '../../screens/EclipseScreen';


const Faces = () => {
    const [velocity, setVelocity] = useState(30);
  // First array - original images
  const images = [
    result1, result2, result3, result4, result5, result6, 
    result7, result8, result9, result10, result11, result12
  ];

  // Second array - new faces
  const newFaces = [
    newFace1, newFace2, newFace3, newFace4, newFace5, newFace6,
    newFace7, newFace8, newFace9, newFace10,
  ];

  return (
    <>
      {/* קרוסלה ראשונה - כיוון שמאל */}
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

      {/* קרוסלה שנייה - כיוון ימין */}
      <div className={styles.container}>
        <div className={styles.scrollTrackReverse}>
          {/* קבוצה ראשונה של תמונות חדשות */}
          <div className={styles.scrollContainer}>
            {newFaces.map((img, index) => (
              <div key={`third-${index}`} className={styles.imageWrapper}>
                <img
                  src={img}
                  alt={`פרצוף חדש ${index + 1}`}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
          {/* קבוצה שנייה זהה של תמונות חדשות */}
          <div className={styles.scrollContainer}>
            {newFaces.map((img, index) => (
              <div key={`fourth-${index}`} className={styles.imageWrapper}>
                <img
                  src={img}
                  alt={`פרצוף חדש ${index + 1}`}
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

export default Faces;