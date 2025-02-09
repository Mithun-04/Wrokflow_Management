import React, { useRef, useState } from 'react';
import "./Home.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import titleImage from '../assets/Title.png.png';
import side_img from '../assets/cont-img.png';
import person from '../assets/person2.png';
import { IoMenu } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

AOS.init({
  duration: 1400,
  once: false,
});

const Home = () => {
  const nextSectionRef = useRef(null);
  const [isLogin, setIsLogin] = useState(true); // Shared state for toggling

  const toggleForm = () => {
    setIsLogin((prev) => !prev); // Toggles between Login and SignUp
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='main'>
      {/* Navbar Section */}
      <div className='wrapper'>
        <img src={titleImage} alt="Logo" className='logo' />
        <ul className='nav-list'>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Membership</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <div className="right-content">
          <button className='nav-btn' onClick={toggleForm}>
            {isLogin ? "Sign Up" : "Back to Login"}
          </button>
          <IoMenu className='menu-icon' />
        </div>
      </div>

      {/* Hero Section */}
      <section className='content'>
        <div className="main-content">
          <h1 data-aos="fade-right" data-aos-duration="1400">
            Keep it simple
          </h1>
          <p data-aos="zoom-in-left" data-aos-duration="1400" data-aos-delay="200">
            Say goodbye to chaos—organize tasks, set priorities, and meet deadlines like never before
          </p>
          <div className="btn">
            <a href="#next" className='nav-btn' data-aos="flip-down" data-aos-duration="1400" data-aos-delay="300">
              Let's Go
            </a>
          </div>
        </div>
        <div className="content-img">
          <img src={side_img} alt="Side Image" data-aos="zoom-in-left" data-aos-duration="1400" data-aos-delay="400" />
        </div>
      </section>

      {/* Social Media Icons */}
      <div className="icons">
        <a href="#" data-aos="fade-in" data-aos-duration="1400" data-aos-delay="500"><FaFacebookF /></a>
        <a href="#" data-aos="fade-in" data-aos-duration="1400" data-aos-delay="600"><FaInstagram /></a>
        <a href="#" data-aos="fade-in" data-aos-duration="1400" data-aos-delay="700"><FaTwitter /></a>
      </div>

      {/* Mid Section with Conditional Rendering */}
      <div className="mid" ref={nextSectionRef} id="next">
        <div>
          <img src={person} alt="Person" className='person' data-aos="zoom-in-right" data-aos-duration="1400" />
        </div>
        {isLogin ? (
          <LoginForm toggleForm={toggleForm} />
        ) : (
          <SignUpForm toggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default Home;
