import React, { useEffect } from 'react';
import"./Home.css"// Import the About CSS
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS CSS

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 data-aos="fade-up">About Us</h1>
          <p data-aos="fade-up" data-aos-delay="200">
            We're here to make your life simpler. Our goal is to help you stay organized, productive, and stress-free.
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="about-card" data-aos="fade-right">
          <h2>Our Mission</h2>
          <p>
            To provide tools that enable individuals and teams to organize their lives seamlessly and efficiently. We believe in simplicity, focus, and achieving goals.
          </p>
        </div>
        <div className="about-card" data-aos="fade-left" data-aos-delay="200">
          <h2>What We Do</h2>
          <p>
            We offer task management solutions tailored to your needs. From setting reminders to managing deadlines, we’ve got you covered.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
