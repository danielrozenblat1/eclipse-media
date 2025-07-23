import { useEffect } from 'react';
import styles from "./ThirdScreen.module.css";
import image1 from "../images/אקליפס תמונות מאשאפ 1.png"
import image2 from "../images/אקליפס תמונות מאשאפ 2.png"
import image3 from "../images/אקליפס תמונות מאשאפ 3.png"
const ThirdScreen = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll(`.${styles.section}`);
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      id: 1,
      number: "01",
      title: "Professional LinkedIn Photography",
      description: "Stand out among thousands of professionals on LinkedIn with high-quality portrait photography specifically designed for tech companies and executives. Our specialized approach captures your unique brand identity while conveying confidence and professionalism.",
      image:image1
    },
    {
      id: 2,
      number: "02", 
      title: "Brand DNA Analysis & Creative Process",
      description: "We don't just take photos - we dive deep into your company's DNA, understand your brand colors, values, and target audience. Our comprehensive process ensures every image aligns with your brand identity and communicates the right message to potential clients and partners.",
      image:image2
    },
    {
      id: 3,
      number: "03",
      title: "Complete Brand Experience & Confidence Boost",
      description: "Our photoshoot experience goes beyond delivering stunning images. We provide your team with the confidence they need to represent your brand professionally. The result is not just a photo, but a complete brand transformation that empowers your employees and elevates your company's presence.",
      image:image3
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>Why Your Tech Company Needs Professional LinkedIn Photography</h1>
        <p className={styles.subtitle}>Transform your professional presence and make your brand unique</p>
      </div>
      
      {steps.map((step, index) => (
        <section 
          key={step.id} 
          className={`${styles.section} ${index % 2 === 1 ? styles.reverse : ''}`}
        >
          <div className={styles.content}>
            <div className={styles.textSection}>
              <span className={styles.number}>{step.number}</span>
              <h2 className={styles.title}>{step.title}</h2>
              <p className={styles.description}>{step.description}</p>
            </div>
            <div className={styles.imageSection}>
              <img 
                src={step.image} 
                alt={step.title}
                className={styles.image}
              />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ThirdScreen;