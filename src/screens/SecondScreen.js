// SecondScreen.jsx
import { useEffect, useRef } from "react";
import styles from "./SecondScreen.module.css";
import ScrollReveal from "scrollreveal";

const SecondScreen = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    const sr = ScrollReveal({
      duration: 1200,
      easing: "ease-in-out",
      reset: true,
    });

    // אנימציה לכותרת עם אפקט צבע משמאל לימין
    sr.reveal(titleRef.current, {
      beforeReveal: (el) => {
        el.classList.add(styles.revealed);
      },
      beforeReset: (el) => {
        el.classList.remove(styles.revealed);
      }
    });

    // ניקוי בעת unmount
    return () => {
      sr.destroy();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div 
        ref={titleRef} 
        className={styles.title}
      >
        About The Process
      </div>
    </div>
  );
};

export default SecondScreen;