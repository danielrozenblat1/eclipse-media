import { useEffect } from 'react';
import styles from "./SixthScreen.module.css";
import FAQItem from '../components/questions/Questions';
import Works from '../components/recommends/Works';
import SeventhScreen from './SeventhScreen';
import ByMe from '../components/ByMe/ByMe';

const SixthScreen = () => {
  return (

    <div className={styles.container}>
<SeventhScreen/>
      <div className={styles.title}>Q & A</div>
      <FAQItem 
        question="Why do tech companies need professional LinkedIn photography?" 
        answer="In a sea of thousands of LinkedIn profiles, standing out is crucial for tech companies and HR professionals. Professional photography isn't just about getting a good picture - it's about creating a unique visual identity that reflects your company's DNA and brand values. When your team looks professional and cohesive, it builds trust and credibility with potential clients, partners, and top talent you're trying to attract."
      />
      <FAQItem 
        question="What's included in your LinkedIn portrait process?" 
        answer="Our process goes far beyond a simple photoshoot. We start by understanding your company's DNA, brand colors, and target goals. During the shoot day, we create multiple high-quality images that align with your brand identity. But here's what makes us different - you don't just get photos. You get confidence. Your team members walk away feeling empowered and ready to represent your brand with pride on LinkedIn and beyond."
      />
      <FAQItem 
        question="How do you make our brand unique in the crowded tech space?" 
        answer="We don't believe in one-size-fits-all photography. Before we even pick up a camera, we sit down with you to understand your company's unique DNA, brand colors, and emotional goals. We analyze what makes your tech company different and translate that into visual storytelling. The result? LinkedIn portraits that don't just look professional - they look distinctly YOU, helping you stand out among thousands of similar profiles in the tech industry."
      />
        <ByMe/>
      </div>

  );
};

export default SixthScreen;