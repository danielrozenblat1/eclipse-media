import React, { useEffect, useRef, useState } from 'react';
import styles from './FirstScreen.module.css';
import DarkVeil from './DarkVeil';
import Loader from '../components/loader/Loader';

// ייבוא תמונות תדמית
import hero1 from "../images/אקליפס תמונות ייחודיות 1.png";
import hero2 from "../images/אקליפס תמונות ייחודיות 2.png";
import hero3 from "../images/אקליפס תמונות ייחודיות 3.png";

import hero5 from "../images/אקליפס תמונות ייחודיות 5.png";
import hero6 from "../images/אקליפס תמונות ייחודיות 6.png";
import hero7 from "../images/אקליפס תמונות ייחודיות 7.png";
import hero8 from "../images/אקליפס תמונות ייחודיות 8.png";
import hero9 from "../images/אקליפס תמונות ייחודיות 9.png";
import hero10 from "../images/אקליפס רקעים מיוחדים 2.png";
import hero11 from "../images/אקליפס תמונת חדשות 1.png";
import hero12 from "../images/אקליפס תמונת חדשות 2.png";
import hero13 from "../images/אקליפס תמונת חדשות 3.png";
import eclipse from "../images/אקליפס לוגו ללא רקע לבן.png";

const HeroSection = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  
  const carouselRef = useRef(null);
  const scrollInterval = useRef(null);
  const scrollPosition = useRef(0);

  const heroImages = [
    hero2,  hero1, hero5, hero6, hero7,
    hero8, hero9, hero10, hero11, hero12, hero13
  ];

  // כל התמונות כולל הלוגו
  const allImages = [...heroImages, eclipse];
  const totalImages = allImages.length;

  // שכפול התמונות 3 פעמים כדי ליצור אפקט אינסופי חלק
  const duplicatedImages = [...heroImages, ...heroImages, ...heroImages];

  // פונקציה לטעינת תמונות
  const preloadImages = () => {
    let loadedCount = 0;

    allImages.forEach((imageSrc) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        setLoadedImagesCount(loadedCount);
        
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadedImagesCount(loadedCount);
        
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = imageSrc;
    });
  };

  const startAutoScroll = () => {
    const scrollStep = 1.25;
    
    scrollInterval.current = setInterval(() => {
      if (carouselRef.current) {
        scrollPosition.current += scrollStep;
        carouselRef.current.scrollLeft = scrollPosition.current;

        // חישוב נקודת האיפוס - כשמגיעים לסוף הסט האמצעי
        const carousel = carouselRef.current;
        const singleSetWidth = carousel.scrollWidth / 3;
        
        // אם הגענו לסוף הסט האמצעי, מאפסים לתחילת הסט האמצעי
        if (scrollPosition.current >= singleSetWidth * 2) {
          scrollPosition.current = singleSetWidth;
          carousel.scrollLeft = scrollPosition.current;
        }
      }
    }, 16);
  };

  const stopAutoScroll = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  };

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.scrollY + 200,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const carousel = carouselRef.current;
    if (!carousel) return;

    // מיקום התחלתי - אמצע הסטים
    const initialPosition = carousel.scrollWidth / 3;
    carousel.scrollLeft = initialPosition;
    scrollPosition.current = initialPosition;

    // התחלת גלילה אוטומטית
    startAutoScroll();

    return () => {
      stopAutoScroll();
    };
  }, [imagesLoaded]);

  if (!imagesLoaded) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.backgroundContainer}>
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.02}
          scanlineIntensity={0.05}
          speed={0.6}
          scanlineFrequency={2}
          warpAmount={1.2}
          resolutionScale={1}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={eclipse} alt="לוגו" />
        </div>

        <h1 className={styles.title}>Make Your Brand Unique</h1>
        <p className={styles.description}>
          Create a unique fingerprint for your company and make your employees' LinkedIn profiles stand out and memorable among thousands of other companies and professionals.
        </p>

        <div 
          className={styles.carousel} 
          ref={carouselRef}
          style={{ 
            cursor: 'default',
            pointerEvents: 'none' // מונע כל אינטראקציה עם הקרוסלה
          }}
        >
          {duplicatedImages.map((img, index) => (
            <div
              key={`hero-${index}`}
              className={styles.carouselSlide}
              style={{ userSelect: 'none' }}
            >
              <img 
                src={img} 
                alt={`Slide ${index}`} 
                className={styles.heroImage}
                draggable={false}
              />
            </div>
          ))}
        </div>
        
        <button 
          className={styles.ctaButton}
          onClick={handleScrollDown}
        >
          scroll down for more information
        </button>
      </div>
    </div>
  );
};

export default HeroSection;