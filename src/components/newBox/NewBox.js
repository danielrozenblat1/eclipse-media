import { useEffect, useRef } from "react";
import styles from "./NewBox.module.css";
import { Player } from "@lordicon/react";
import ScrollReveal from "scrollreveal";

const NewBox = (props) => {
  const handleComplete = () => {
    setTimeout(() => {
      playerRef1?.current?.playFromBeginning();
    }, 2500); // play again after 2.5 seconds
  };
  const playerRef1 = useRef(null);

  useEffect(() => {
    playerRef1?.current?.playFromBeginning();
  }, []);

  useEffect(() => {
    ScrollReveal().reveal(`.${styles.title}`, {
      duration: 1000,
      distance: "30px",
      origin: "right",
      easing: "ease-out",
      reset: false,
      viewFactor: 0.2,
      interval: 300,
      delay: 200,
      scale: 1,
    });

    ScrollReveal().reveal(`.${styles.description}`, {
      duration: 1000,
      distance: "30px",
      origin: "bottom",
      easing: "ease-out",
      reset: false,
      viewFactor: 0.2,
      interval: 300,
      delay: 200,
      scale: 1,
    });

    ScrollReveal().reveal(`.${styles.icon}`, {
      duration: 1000,
      distance: "30px",
      origin: "left",
      easing: "ease-out",
      reset: false,
      viewFactor: 0.2,
      interval: 300,
      delay: 200,
      scale: 1,
    });
  }, []);

  return (
    <div className={styles.NewBox}>
      <div className={styles.row}>
      <div className={styles.icon}>
        <Player icon={props.icon} ref={playerRef1} size="100%" loop={true} onComplete={handleComplete}></Player>
      </div>
      <div className={styles.title}>{props.title}</div>
  
      </div>
      <div className={styles.description}>{props.description}</div>
    </div>
  );
};

export default NewBox;
