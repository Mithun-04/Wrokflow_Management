import React from 'react'
import './Home.css'
import titleImage from './assets/Title.png.png';
import side_img from './assets/cont-img.png';
import { IoMenu } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";



const Home = () => (
  <div className='main'>
    <div className='wrapper'>
      <img src={titleImage} alt="image" className='logo' />
      <ul className='nav-list'>
        <ul><a href="#">Home</a></ul>
        <ul><a href="#">About</a></ul>
        <ul><a href="#">Membership</a></ul>
        <ul><a href="#">Contact</a></ul>

      </ul>

      <div className="right-content">
        <a href="#" className='nav-btn'>Sign In</a>
        <IoMenu className='menu-icon' />
      </div>


    </div>
    <section className='content'>
      <div className="main-content">
        <h1 data-aos = "fade-right" data-aos-duration = "1400">
          keep it simple
        </h1>
        <p data-aos = "zoom-in-left" data-aos-duration = "1400" data-aos-delay ="200">
          Say goodbye to chaos—organize tasks, set priorities, and meet deadlines like never before
        </p>
        <div className="btn">
          <a href="#" className='nav-btn' data-aos = "flip-down" data-aos-duration = "1400" data-aos-delay ="300">let's go</a>
        </div>

      </div>

      <div className="content-img">
        <img src={side_img} alt="" data-aos = "zoom-in-left" data-aos-duration = "1400" data-aos-delay ="300"/>
      </div>
    </section>

    <div className="icons">
      <a href="" data-aos = "fade-in" data-aos-duration = "1400" data-aos-delay ="500"><FaFacebookF /></a>
      <a href="" data-aos = "fade-in" data-aos-duration = "1400" data-aos-delay ="600"><FaInstagram /></a>
      <a href="" data-aos = "fade-in" data-aos-duration = "1400" data-aos-delay ="700" ><FaTwitter /></a>
    </div>
  </div>

)


export default Home;