import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from "./ForthScreen.module.css";
import image1 from "../images/אקליפס תמונות מאשאפ 3.png"
import image2 from "../images/אקליפס תמונות מאשאפ 2.png"
import image3 from "../images/אקליפס תמונות מאשאפ 5.png"
import image4 from "../images/אקליפס תמונות מאשאפ 6.png"
import SimpleVideoGallery from '../components/parralex/Parralex';

const ScrollFloat = ({
  children,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef(null);
  
  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split("").map((char, index) => (
      <span className={styles.char} key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Intersection Observer fallback for GSAP effect
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const charElements = el.querySelectorAll(`.${styles.char}`);
            charElements.forEach((char, index) => {
              setTimeout(() => {
                char.classList.add(styles.charVisible);
              }, index * (stagger * 1000));
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger]);

  return (
    <h2 ref={containerRef} className={`${styles.scrollFloat} ${containerClassName}`}>
      <span className={`${styles.scrollFloatText} ${textClassName}`}>
        {splitText}
      </span>
    </h2>
  );
};

const ForthScreen = () => {
  const sectionsRef = useRef([]);
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

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

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

  // Phone validation (international format) - FIXED VERSION
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
    
    // Server data object - בדיוק כמו אצל קרן
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

  const workflowSteps = [
    {
      number: "01",
      title: "Brand DNA Discovery",
      description: "We sit with your team to understand your company's DNA, brand colors, and core values. We identify what makes your brand unique and define the emotional goals that drive action.",
      image: image1
    },
    {
      number: "02", 
      title: "Professional LinkedIn Portraits",
      description: "We create high-quality, professional portraits specifically designed for LinkedIn. Our goal is to help you stand out among thousands of profiles with images that convey confidence and professionalism.",
      image:image3
    },
    {
      number: "03",
      title: "Strategic Photo Session",
      description: "We plan and execute a comprehensive photo shoot that captures not just images, but the essence of your team. Every shot is designed to communicate trust, expertise, and your company's unique personality.",
      image: image2
    },
    {
      number: "04",
      title: "Confidence & Brand Delivery",
      description: "You receive more than just photos - you get a complete brand experience. Your team gains confidence, and your company projects the professional image needed to attract top-tier clients and talent.",
      image:image4
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.parallaxBg}></div>
      
      <div className={styles.header}>
        <ScrollFloat
          containerClassName={styles.headerTitle}
          animationDuration={1.2}
          stagger={0.05}
        >
          Our Workflow Process
        </ScrollFloat>
        <p className={styles.headerDescription}>From brand discovery to confidence delivery - here's how we transform your professional presence</p>
      </div>

      {workflowSteps.map((step, index) => (
        <section
          key={step.number}
          ref={(el) => (sectionsRef.current[index] = el)}
          className={`${styles.step} ${index % 2 === 0 ? styles.leftText : styles.rightText} ${styles.fadeIn}`}
        >
          <div className={styles.stepContent}>
            <div className={styles.textSection}>
              <div className={styles.stepNumber} data-number={step.number}>{step.number}</div>
              <ScrollFloat
                containerClassName={styles.stepTitleContainer}
                animationDuration={1}
                stagger={0.03}
                scrollStart="top bottom-=20%"
                scrollEnd="bottom top+=20%"
              >
                {step.title}
              </ScrollFloat>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
            
            <div className={styles.imageSection}>
              <div className={styles.imageWrapper}>
                <img src={step.image} alt={step.title} className={styles.stepImage} />
                <div className={styles.imageOverlay}></div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Video Gallery Section */}
      <div className={styles.header}>
        <ScrollFloat
          containerClassName={styles.headerTitle}
          animationDuration={1.2}
          stagger={0.05}
        >
          And It Goes Like This..
        </ScrollFloat>
        <SimpleVideoGallery/>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <h1 className={styles.ctaTitle}>
          Ready to Make Your Brand Unique?
        </h1>
        <p className={styles.ctaDescription}>
          Let's create a unique visual identity that sets your company apart and makes your team shine on LinkedIn.
        </p>
        <button 
          className={styles.ctaButton}
          onClick={() => setShowOverlay(true)}
        >
          Our Journey Starts Here
        </button>
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

export default ForthScreen;