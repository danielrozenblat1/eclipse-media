import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
import hero14 from "../images/אקליפס תמונות תדמית רגילות 5.png";
import hero15 from "../images/אקליפס תמונות תדמית רגילות 7.png";
import eclipse from "../images/אקליפס לוגו ללא רקע לבן.png";
import Works from '../components/recommends/Works';

const HeroSection = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: ''
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    companyName: '',
    email: '',
    phone: ''
  });

  // State for form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Server settings
  const serverUrl = "https://dynamic-server-dfc88e1f1c54.herokuapp.com/leads/newLead";
  const reciver = "Info@eclipsemedia.co.il";
  
  const carouselRef = useRef(null);
  const scrollInterval = useRef(null);
  const scrollPosition = useRef(0);

  const heroImages = [
    hero2,  hero1, hero5, hero6, hero15, hero7,
    hero8, hero9,hero14, hero10, hero11, hero12, hero13, 
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation (international format)
  const isValidPhone = (phone) => {
    // Remove all non-digits except +
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // Just check that we have at least 7 digits and max 15 characters
    const digitsOnly = cleanPhone.replace(/\+/g, '');
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    const { companyName, email, phone } = formData;
    
    // Validate inputs
    let valid = true;
    const newErrors = {};

    // Validate company name
    if (!companyName.trim()) {
      newErrors.companyName = 'Please enter company name';
      valid = false;
    } else if (companyName.trim().length < 2) {
      newErrors.companyName = 'Company name must be at least 2 characters';
      valid = false;
    }

    // Validate email
    if (!email.trim()) {
      newErrors.email = 'Please enter email address';
      valid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    // Validate phone number
    if (!phone.trim()) {
      newErrors.phone = 'Please enter phone number';
      valid = false;
    } else if (!isValidPhone(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      valid = false;
    }

    setErrors(newErrors);
    
    if (!valid) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Server data object
    const serverData = {
      name: companyName,
      phone: phone,
      email: email,
      reciver: reciver
    };

    try {
      // Send to server
      const serverResponse = await fetch(serverUrl, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(serverData)
      });

      if (serverResponse.ok) {
        // רק אם השליחה הצליחה באמת
        setIsSubmitting(false);
        setSubmitted(true);
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            companyName: '',
            email: '',
            phone: ''
          });
          setSubmitted(false);
          setShowOverlay(false);
        }, 3000);
      } else {
        // אם יש שגיאה מהשרת
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      // במקרה של שגיאה - לא מראים "נשלח בהצלחה"
      alert("An error occurred, please try again later");
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      // לא מעדכנים את submitted ל-true!
    }
  };

  const isFormValid = 
    formData.companyName.trim() !== '' && 
    isValidEmail(formData.email) && 
    isValidPhone(formData.phone);

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
        {/* <div className={styles.imageContainer}>
          <img className={styles.image} src={eclipse} alt="לוגו" />
        </div> */}

        <h1 className={styles.title}>Make Your Brand Unique</h1>
        <p className={styles.description}>
          Create a unique fingerprint for your company and make your employees' LinkedIn profiles stand out and memorable among thousands of other companies and professionals.
        </p>

        <div 
          className={styles.carousel} 
          ref={carouselRef}
          style={{ 
            cursor: 'default',
            pointerEvents: 'none' // מונع כל אינטראקציה עם הקרוסלה
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
      <div className={styles.title}>Trusted By</div>
      <Works/>
        <div className={styles.buttonsContainer}>
      
          
          <button 
            className={styles.secondaryButton}
            onClick={() => setShowOverlay(true)}
          >
            Get Started Now
          </button>
        </div>
      </div>

      {/* Overlay with form */}
      {showOverlay && createPortal(
        <div className={styles.overlay} onClick={() => setShowOverlay(false)}>
          <div className={styles.formContainer} onClick={(e) => e.stopPropagation()} style={{ direction: 'ltr' }}>
            <button 
              className={styles.closeButton}
              onClick={() => setShowOverlay(false)}
              disabled={isSubmitting}
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
                  className={`${styles.input} ${errors.companyName ? styles.inputError : ''}`}
                  required
                  placeholder="Enter your company name"
                  disabled={isSubmitting || submitted}
                />
                {errors.companyName && <span className={styles.errorText}>{errors.companyName}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  required
                  placeholder="example@company.com"
                  disabled={isSubmitting || submitted}
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                  required
                  placeholder="+1-234-567-8900"
                  disabled={isSubmitting || submitted}
                />
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>

              <button 
                type="submit" 
                className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''} ${submitted ? styles.submitted : ''}`}
                disabled={!isFormValid || isSubmitting || submitted}
                style={{ 
                  opacity: (!isFormValid || isSubmitting || submitted) ? 0.6 : 1,
                  cursor: (!isFormValid || isSubmitting || submitted) ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'Sending...' : submitted ? 'Sent Successfully!' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default HeroSection;