import React from 'react'
import Home from './Home.jsx'
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once : true
    });
  }, []);

  return (
    <div>
      <Home />
    </div>
  )
}

export default App