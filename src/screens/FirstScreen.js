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
  
  // משתנים לגרירה ומגע
  const isInteracting = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const isDragging = useRef(false);
  const interactionTimeout = useRef(null);

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
    if (isInteracting.current) return;
    
    const scrollStep = 1.25;
    
    scrollInterval.current = setInterval(() => {
      if (carouselRef.current && !isInteracting.current) {
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

  const handleInteractionStart = () => {
    isInteracting.current = true;
    stopAutoScroll();
    
    // ביטול timeout קודם אם קיים
    if (interactionTimeout.current) {
      clearTimeout(interactionTimeout.current);
    }
  };

  const handleInteractionEnd = () => {
    // המתנה של 2 שניות לפני חזרה לגלילה אוטומטית
    interactionTimeout.current = setTimeout(() => {
      isInteracting.current = false;
      startAutoScroll();
    }, 2000);
  };

  // פונקציות לטיפול במגע (Touch Events)
  const handleTouchStart = (e) => {
    handleInteractionStart();
    startX.current = e.touches[0].clientX;
    startScrollLeft.current = carouselRef.current.scrollLeft;
    scrollPosition.current = carouselRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!carouselRef.current) return;
    
    const x = e.touches[0].clientX;
    const deltaX = x - startX.current;
    const newScrollLeft = startScrollLeft.current - deltaX;
    
    carouselRef.current.scrollLeft = newScrollLeft;
    scrollPosition.current = newScrollLeft;
    
    // בדיקה לאיפוס אינסופי
    checkInfiniteScroll();
  };

  const handleTouchEnd = () => {
    handleInteractionEnd();
  };

  // פונקציות לטיפול בגרירת עכבר (Mouse Events)
  const handleMouseDown = (e) => {
    handleInteractionStart();
    isDragging.current = true;
    startX.current = e.clientX;
    startScrollLeft.current = carouselRef.current.scrollLeft;
    scrollPosition.current = carouselRef.current.scrollLeft;
    
    // מניעת selection של טקסט בזמן גרירה
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !carouselRef.current) return;
    
    const x = e.clientX;
    const deltaX = x - startX.current;
    const newScrollLeft = startScrollLeft.current - deltaX;
    
    carouselRef.current.scrollLeft = newScrollLeft;
    scrollPosition.current = newScrollLeft;
    
    // בדיקה לאיפוס אינסופי
    checkInfiniteScroll();
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    handleInteractionEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      handleInteractionEnd();
    }
  };

  // פונקציה לבדיקת איפוס אינסופי
  const checkInfiniteScroll = () => {
    if (!carouselRef.current) return;
    
    const carousel = carouselRef.current;
    const singleSetWidth = carousel.scrollWidth / 3;
    
    // אם גללנו יותר מדי שמאלה, קפיצה לסוף הסט האמצעי
    if (scrollPosition.current <= 0) {
      scrollPosition.current = singleSetWidth * 2 - 1;
      carousel.scrollLeft = scrollPosition.current;
    }
    // אם גללנו יותר מדי ימינה, קפיצה לתחילת הסט האמצעי
    else if (scrollPosition.current >= singleSetWidth * 2) {
      scrollPosition.current = singleSetWidth + 1;
      carousel.scrollLeft = scrollPosition.current;
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
    alert('Form submitted successfully!');
    setShowOverlay(false);
    setFormData({ companyName: '', email: '', phone: '' });
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

    // הוספת אירועי עכבר לכניסה ויציאה מהקרוסלה
    const handleMouseEnter = () => {
      if (!isDragging.current) {
        handleInteractionStart();
      }
    };

    const handleMouseLeaveCarousel = () => {
      if (!isDragging.current) {
        handleInteractionEnd();
      }
    };

    carousel.addEventListener("mouseenter", handleMouseEnter);
    carousel.addEventListener("mouseleave", handleMouseLeaveCarousel);

    // הוספת אירועי גרירה גלובליים
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      stopAutoScroll();
      if (interactionTimeout.current) {
        clearTimeout(interactionTimeout.current);
      }
      
      if (carousel) {
        carousel.removeEventListener("mouseenter", handleMouseEnter);
        carousel.removeEventListener("mouseleave", handleMouseLeaveCarousel);
      }
      
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
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
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
        >
          {duplicatedImages.map((img, index) => (
            <div
              key={`hero-${index}`}
              className={`${styles.carouselSlide} ${
                hoveredIndex !== null && hoveredIndex !== index ? styles.blurred : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ userSelect: 'none' }} // מניעת בחירת טקסט
            >
              <img 
                src={img} 
                alt={`Slide ${index}`} 
                className={styles.heroImage}
                draggable={false} // מניעת גרירת התמונה
              />
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