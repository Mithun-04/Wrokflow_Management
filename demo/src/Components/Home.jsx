// eslint-disable-next-line no-unused-vars
import React, { useContext, useRef } from 'react'; // Added useContext
import '../styles/Home.css'; // Import CSS for this component
import 'aos/dist/aos.css'; // AOS CSS
import side_img from '../assets/cont-img.png'; // Path to the side image
import person from '../assets/person2.png'; // Path to the person image
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"; // Social icons
import LoginForm from './LoginForm'; // Login form component
import SignUpForm from './SignUpForm'; // Sign-up form component
import { LoginContext } from "../context/LoginContext"; // Import the LoginContext

const Home = () => {
  const { isLogin, toggleForm } = useContext(LoginContext); // Use LoginContext to get isLogin and toggleForm
  const nextSectionRef = useRef(null);

  return (
    <div className='main'>
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

        {/* Conditional Rendering of Forms */}
        <div className="form-container" data-aos="fade-up" data-aos-duration="1400">
          {isLogin ? (
            <LoginForm toggleForm={toggleForm}/>
          ) : (
            <SignUpForm toggleForm={toggleForm}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
