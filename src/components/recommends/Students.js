import styles from "./Recommends.module.css"

import result1 from "../../images/סוזנה פנחסי לקוחה ממליצה 1.png";
import result2 from "../../images/סוזנה פנחסי לקוחה ממליצה 2.png";
import result3 from "../../images/סוזנה פנחסי לקוחה ממליצה 3.png";



import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from "../button/Button"

const Students=()=>{
    const sliderSettings = {
     
        infinite: true,
        speed: 700,
        autoplaySpeed: 2500,
        infinite: true,
   
        dots:false,
        
        slidesToShow: window.innerWidth < 450 ? 1 :
                 
                      window.innerWidth <= 1050 ? 2 : 4,
        slidesToScroll:1,
                     
      };
      const content = [
        {
          type: 'image',
          src: result1,
        },
       
        {
          type: 'image',
          src: result2,
        },
        {
          type: 'image',
          src: result3,
        },
      
   
     ];
return <>
<div className={styles.title}>איך אפשר בלי תוצאות?</div>
<div className={styles.explain}>הכנתי מקבץ קטן של בנות שעברו דרכי, של העבודות שלהן אחרי הקורסים ושל מה שיש להן להגיד.. תחליקי בין התמונות</div>
<div className={styles.sliderContainer}>

        <Slider {...sliderSettings}>
          {content.map((item, index) => (
            <div key={index} itemscope itemtype="http://schema.org/Review">
              {item.type === 'image' && (
                <img src={item.src} className={styles.image1} alt={`קרן אמבאי לקוחה ממליצה מספר ${index + 1}`} itemprop="image"/>
              )}
              {item.type === 'video' && (
                <video
                  style={{ width: "100%",display:"flex",objectFit:"cover", margin: "auto", height: "100%" }}
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  controls
                  itemprop="image"
                >
                  <source src={item.src} type="video/mp4" />
             
                </video>
         
              )}
           <meta itemprop="datePublished" content={new Date().toISOString()} />
            </div>
            
          ))}
        </Slider>
      </div>
      <Button text="אני רוצה לשמוע עוד"/>


</>


}
export default Students