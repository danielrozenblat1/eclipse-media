import React, { useRef } from 'react';
import styles from './Parrlalex.module.css';
import eclipse1 from "../../videos/סידי אלמוג אווירה 1.mp4"
import eclipse2 from "../../videos/סידי אלמוג אווירה 2.mp4"
import eclipse3 from "../../videos/סידי אלמוג אווירה 3.mp4"
import eclipse4 from "../../videos/סידי אלמוג אווירה 4.mp4"
import eclipse5 from "../../videos/סידי אלמוג אווירה 5.mp4"
import eclipse6 from "../../videos/סידי אלמוג אווירה 6.mp4"
import eclipse7 from "../../videos/סידי אלמוג אווירה 7.mp4"



const SimpleVideoGallery = () => {
  const videoRefs = [useRef(null), useRef(null)];

  const videos = [
    {
      id: 1,
      videoSrc: eclipse1
    },
    {
      id: 2,
      videoSrc: eclipse2
    },
       {
      id: 3,
      videoSrc: eclipse3
    },
       {
      id: 4,
      videoSrc: eclipse4
    },
       {
      id: 5,
      videoSrc: eclipse5
    },
       {
      id: 6,
      videoSrc: eclipse6
    },   {
      id: 7,
      videoSrc: eclipse7
    },
  ];

  return (
    <div className={styles.container}>
      {/* כותרת */}
      <div className={styles.hero}>
        {/* <h1 className={styles.heroTitle}>
First Of All
        </h1> */}
      </div>

      {/* קונטיינר הווידאואים */}
      <div className={styles.videosContainer}>
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={styles.videoWrapper}
          >
            <video
              ref={videoRefs[index]}
              className={styles.videoElement}
              muted
              loop
              playsInline
              autoPlay
            >
              <source src={video.videoSrc} type="video/mp4" />
              הדפדפן שלך לא תומך בתגית וידאו.
            </video>
          </div>
        ))}
      </div>
   
    </div>
  );
};

export default SimpleVideoGallery;