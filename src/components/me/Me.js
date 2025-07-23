import React from 'react';
import styles from './Me.module.css';
import suzana from "../../images/סוזנה פנחסי.png";
import suzanaStudents from "../../images/סוזנה בנות עם תעודה.png"
import Works from '../recommends/Works';
const AboutMe = () => {
  return (
    <>
      <div className={styles.header} id="מי אני">נעים מאוד</div>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={suzana} alt="סוזנה פנחסי" className={styles.image} />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>סוזנה פנחסי</h1>
          <div className={styles.subtitle}>"להתעסק בתחום תמיד היה עבורי סוג של תרפיה"</div>
          <p className={styles.description}>
            תמיד אהבתי את תחום הביוטי והרגשתי חיבור עמוק אליו. לפני כ-8 שנים, כשהתחלתי להתעמק בו יותר, הבנתי שיש לי כישרון טבעי ותשוקה אמיתית לתחום. מה שהתחיל כתרפיה, הפך במהרה לדרך חיים מקצועית.
          </p>
          <p className={styles.description}>
            ככל שהתפתחתי בתחום, גיליתי שהשילוב של האהבה שלי למקצוע יחד עם היחס האישי והסבלנות שאני מעניקה, יוצרים תוצאות מדהימות. הביקוש הרב והיומן שהתמלא תוך חודשיים בלבד, הראו לי שאני בדרך הנכונה. היום, אחרי 8 שנות ניסיון, אני גאה להעביר את הידע והניסיון שלי הלאה ולהצמיח את הדור הבא של המקצוע.
          </p>
        </div>
      </div>
      {/* <div className={styles.subheader}>הובלתי נשים לפתיחת עסק</div>
      <div className={styles.bottomImageContainer}>
        <img src={suzanaStudents} alt="סוזנה פנחסי" className={styles.bottomImage} />
      </div> */}
  <Works/>
    </>
  );
};

export default AboutMe;