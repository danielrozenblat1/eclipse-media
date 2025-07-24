import React, { useEffect, useRef, useState } from 'react';
import styles from './FirstScreen.module.css';
import DarkVeil from './DarkVeil';
import Loader from '../components/loader/Loader';

// ייבוא תמונות תדמית
import hero1 from "../images/אקליפס תמונות ייחודיות 1.png";
import hero2 from "../images/אקליפס תמונות ייחודיות 2.png";
import hero3 from "../images/אקליפס תמונות ייחודיות 3.png";
import hero4 from "../images/אקליפס תמונות ייחודיות 4.png";
import hero5 from "../images/אקליפס תמונות ייחודיות 5.png";
import hero6 from "../images/אקליפס תמונות ייחודיות 6.png";
import hero7 from "../images/אקליפס תמונות ייחודיות 7.png";
import hero8 from "../images/אקליפס תמונות ייחודיות 8.png";
import hero9 from "../images/אקליפס תמונות ייחודיות 9.png";

import eclipse from "../images/אקליפס לוגו ללא רקע לבן.png";

const HeroSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: ''
  });
  const carouselRef = useRef(null);
  const scrollInterval = useRef(null);
  const scrollPosition = useRef(0);

  const heroImages = [
    hero2, hero3, hero4, hero1, hero5, hero6, hero7,
    hero8, hero9
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
    const scrollStep = 1.25; // הקטנת מהירות הגלילה פי 2
    
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
    }, 16); // 60fps לתנועה חלקה יותר
  };

  const stopAutoScroll = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // כאן תוכל להוסיף את הלוגיקה לשליחת הטופס
    alert('Form submitted successfully!');
    setShowOverlay(false);
    setFormData({ companyName: '', email: '', phone: '' });
  };

  useEffect(() => {
    // התחלת טעינת התמונות
    preloadImages();
  }, []);

  useEffect(() => {
    // הגדרת הקרוסלה רק אחרי שהתמונות נטענו
    if (!imagesLoaded) return;

    const carousel = carouselRef.current;
    if (!carousel) return;

    // מיקום התחלתי - אמצע הסטים כדי שיהיה מקום לגלול לשני הכיוונים
    const initialPosition = carousel.scrollWidth / 3;
    carousel.scrollLeft = initialPosition;
    scrollPosition.current = initialPosition;

    // התחלת גלילה אוטומטית
    startAutoScroll();

    // הוספת אירועי עכבר
    carousel.addEventListener("mouseenter", stopAutoScroll);
    carousel.addEventListener("mouseleave", startAutoScroll);

    return () => {
      stopAutoScroll();
      if (carousel) {
        carousel.removeEventListener("mouseenter", stopAutoScroll);
        carousel.removeEventListener("mouseleave", startAutoScroll);
      }
    };
  }, [imagesLoaded]);

  // אם התמונות עדיין לא נטענו, הצג את הLoader
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

        <div className={styles.carousel} ref={carouselRef}>
          {duplicatedImages.map((img, index) => (
            <div
              key={`hero-${index}`}
              className={`${styles.carouselSlide} ${
                hoveredIndex !== null && hoveredIndex !== index ? styles.blurred : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img src={img} alt={`Slide ${index}`} className={styles.heroImage} />
            </div>
          ))}
        </div>
        
        <button 
          className={styles.ctaButton}
          onClick={() => setShowOverlay(true)}
        >
          click here to contact us
        </button>
      </div>

      {/* Overlay עם טופס */}
      {showOverlay && (
        <div className={styles.overlay} onClick={() => setShowOverlay(false)}>
          <div className={styles.formContainer} onClick={(e) => e.stopPropagation()} style={{ direction: 'ltr' }}>
            <button 
              className={styles.closeButton}
              onClick={() => setShowOverlay(false)}
            >
              ✕
            </button>
            
            <h2 className={styles.formTitle}>Few details and we're done</h2>
            <p className={styles.formSubtitle}>Tell us about your company</p>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  placeholder="Enter your company name"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  placeholder="example@company.com"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  placeholder="+1-234-567-8900"
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;