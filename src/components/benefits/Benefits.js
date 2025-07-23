import React from 'react';
import { Package, Heart, GraduationCap, Headphones, TrendingUp } from 'lucide-react';
import styles from './Benefits.module.css';

const GlassEffectBenefits = () => {
  const benefits = [
    {
      icon: <Package />,
      text: "ערכת מוצרים מלאה",
      description: "כל הציוד הנדרש להתחלת עבודה מיידית"
    },
    {
      icon: <Heart />,
      text: "יחס אישי",
      description: "הדרכה צמודה והתאמה אישית לקצב שלך"
    },
    {
      icon: <GraduationCap />,
      text: "100% תרגול מעשי",
      description: "למידה מעשית על מודלים אמיתיים"
    },
    {
      icon: <Headphones />,
      text: "ליווי ותמיכה בסיום",
      description: "זמינות מלאה לשאלות גם אחרי סיום הקורס"
    },
    {
      icon: <TrendingUp />,
      text: "טיפים לפתיחה ולניהול עסק",
      description: "כלים מעשיים להצלחה עסקית"
    }
  ];

  return (
    <div className={styles.outer}>
      <div className={styles.backgroundShapes}>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
      </div>
      <div className={styles.benefitsContainer}>
        <div className={styles.glassOverlay}></div>
        <div className={styles.content}>
          <div className={styles.benefitsHeader}>
            <div className={styles.titleWrapper}>
              <h3 className={styles.benefitsTitle}>
                כל הקורסים כוללים
              </h3>
              <div className={styles.decorativeLine}></div>
            </div>
          </div>
          
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className={styles.benefitItem}
              >
                <div className={styles.benefitGlass}></div>
                <div className={styles.benefitContent}>
                  <div className={styles.iconContainer}>
                    <div className={styles.iconGlow}></div>
                    <div className={styles.iconWrapper}>
                      {benefit.icon}
                    </div>
                  </div>
                  <div className={styles.textContent}>
                    <span className={styles.benefitText}>
                      {benefit.text}
                    </span>
                    <span className={styles.benefitDescription}>
                      {benefit.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassEffectBenefits;