// StyledMessages.jsx
import React from 'react';
import { TrendingUp, Heart, Award } from 'lucide-react';
import styles from './Trending.module.css';

const TextWithIcon = ({ text, icon: Icon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

const StyledMessages = () => {
  const messages = [
    {
      text: "כי שוק היופי והטיפוח בישראל צומח בקצב מסחרר",
      icon: TrendingUp
    },
    {
      text: "כי נשים היום מוכנות להשקיע יותר מתמיד בטיפוח ויופי",
      icon: Heart
    },
    {
      text: "כי המסלול שלי מציע לך דרך בטוחה ומוכחת להפוך למומחית מבוקשת",
      icon: Award
    }
  ];

  return (
    <div className={styles.container}>
      {messages.map((message, index) => (
        <TextWithIcon 
          key={index} 
          text={message.text} 
          icon={message.icon}
        />
      ))}
    </div>
  );
};

export default StyledMessages;