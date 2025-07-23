import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import Button from '../button/Button';
import styles from "./WhoFits.module.css";

const WhoFits = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.animateFadeIn);
        }
      });
    });

    document.querySelectorAll(`.${styles.revealItem}`).forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const items = [
    "את מרגישה שיש לך פונטנציאל גדול יותר מלהשאר רק כשכירה",
    "את מבינה שאת זקוקה לכלים וידע כדי להצליח",
"תמיד אהבת את עולם הביוטי ואת מרגישה שיש לך הרבה מה לתת",
"את מוכנה להשקיע ולהתמסר כדי לראות תוצאות",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Title section */}
        <div className={styles.titleWrapper}>

          <h1 className={styles.title}>איך תדעי שאת מתאימה לתכנית הקורסים שלי?</h1>
        </div>

        {/* Items */}
        <div className={styles.itemsGrid}>
          {items.map((item, index) => (
            <div key={index} className={`${styles.revealItem}`}>
              <div className={styles.card}>
                <div className={styles.checkmarkWrapper}>
                  <Check className={styles.checkIcon} />
                </div>
                <div className={styles.textWrapper}>
                  <p className={styles.itemText}>{item}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className={styles.buttonWrapper}>
          <Button text="סוזנה אני מתאימה!"/>
        </div>
      </div>
    </div>
  );
};

export default WhoFits;