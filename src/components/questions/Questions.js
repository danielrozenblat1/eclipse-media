import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import styles from './Questions.module.css';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const contentEl = contentRef.current;
      setHeight(contentEl.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className={styles.faqItem} id="שאלות תשובות">
      <button
        className={styles.questionButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.iconWrapper}>
          {isOpen ? (
            <Minus className={styles.icon} />
          ) : (
            <Plus className={styles.icon} />
          )}
        </div>
        <span className={styles.questionText}>{question}</span>
        <div className={styles.iconWrapper}></div>
      </button>
      <div 
        className={styles.answerContainer} 
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef}>
          <p className={styles.answerText}>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;