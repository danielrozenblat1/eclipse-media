import logo from './logo.svg';
import './App.css';
import HeroSection from './screens/FirstScreen';
import SecondScreen from './screens/SecondScreen';
import ScrollVelocity from './screens/EclipseScreen';
import { useState } from 'react';
import ThirdScreen from './screens/ThirdScreen';
import ForthScreen from './screens/ForthScreen';
import LightRays from './screens/FifthScreen';
import SixthScreen from './screens/SixthScreen';
import ByMe from './components/ByMe/ByMe';

function App() {

  return <>
  <HeroSection/>

   <ForthScreen/>
  {/* <ThirdScreen/> */}

  
  <SixthScreen/>

   {/* <SecondScreen/> */}
  
  </>
}

export default App;
