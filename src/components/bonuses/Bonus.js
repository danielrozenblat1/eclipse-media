import React, { useEffect, useRef } from 'react';
import styles from './Bonus.module.css';
import ScrollReveal from 'scrollreveal';
import { Player } from '@lordicon/react';
import kit from "../../Icons/wired-outline-108-box-morph-open.json";
import shake from "../../Icons/wired-outline-645-people-handshake-transaction-hover-pinch.json";
import practice from "../../Icons/wired-outline-2408-number-100-hover-pinch.json";
import finish from "../../Icons/wired-outline-2525-finish-line-hover-flags.json"
import business from "../../Icons/wired-outline-187-suitcase-hover-pinch.json"
const BenefitCard = () => {
    const benefits = [
        {
          id: "01",
          title: "ערכת מוצרים מלאה",
          description: "כל תלמידה שלי מקבלת את כל הציוד הנדרש להתחלת עבודה מיידית",
          icon: kit
        },
        {
          id: "02",
          title: "יחס אישי",
          description: "אני איתך! לאורך כל הקורס יד ביד, מקשיבה ועוזרת עם הדרכה צמודה והתאמה אישית לקצב שלך",
          icon: shake
        },
        {
          id: "03",
          title: "100% תרגול מעשי",
          description: "לאורך כל הקורס את תתרגלי ותוציאי עבודות. דרך תרגול מעשי תצאי מוכנה יותר לדרך עצמאית",
          icon: practice
        },
        {
          id: "04",
          title: "ליווי ותמיכה בסיום",
          description: "גם אחרי שקיבלת ממני את התעודה את תמיד יכולה לפנות אלי לכל שאלה,חשש שעולה או התייעצות בכל נושא! אני זמינה לך!",
          icon: finish
        },
        {
          id: "05",
          title: "טיפים לפתיחה ולניהול עסק",
          description: "כדי לצאת לעולם העסקים מוכנה את מקבלת ממני בכל קורס - שיעור שיווק וצילום, שיעור תמחור,התנהלות והגדרת נהלי עבודה ושיעור מקיף על פתיחת עסק",
          icon: business
        }
    ];

  const playerRefs = useRef(benefits.map(() => React.createRef()));

  const handleComplete = (index) => {
    setTimeout(() => {
      if (playerRefs.current[index]?.current) {
        playerRefs.current[index].current.playFromBeginning();
      }
    }, 2500);
  };

  // Initial animation play
  useEffect(() => {
    playerRefs.current.forEach(ref => {
      if (ref.current) {
        ref.current.playFromBeginning();
      }
    });
  }, []);

  // ScrollReveal animations
  useEffect(() => {
    // Configure ScrollReveal
    const sr = ScrollReveal({
      distance: '30px',
      duration: 1000,
      easing: 'ease-out',
      reset: false,
      viewFactor: 0.2,
      interval: 300,
      delay: 200,
      scale: 1,
    });

    // Title animation
    sr.reveal(`.${styles.title}`, {
      origin: 'right'
    });

    // Description animations
    sr.reveal(`.${styles.cardDescription}`, {
      origin: 'bottom'
    });

    // Icon animations
    sr.reveal(`.${styles.icon}`, {
      origin: 'left'
    });

    // Cleanup
    return () => sr.destroy();
  }, []);

  return (
    <div className={styles.benefitContainer}>
      <h2 className={styles.title}>
        חשוב לי שתדעי שכל הקורסים כוללים:
      </h2>
      
      <div className={styles.cardsGrid}>
        {benefits.map((benefit, index) => (
          <div key={benefit.id} className={styles.card}>
            <div className={styles.numberOverlay}>
              {benefit.id}
            </div>
            <div className={styles.icon}>
              <Player 
                icon={benefit.icon}
                ref={playerRefs.current[index]}
                size="100%"
                onComplete={() => handleComplete(index)}
                colorize="white"
                state="hover-cycle"
              />
            </div>
            <h3 className={styles.cardTitle}>
              {benefit.title}
            </h3>
            <p className={styles.cardDescription}>
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitCard;