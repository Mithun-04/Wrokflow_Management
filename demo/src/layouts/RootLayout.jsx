import React, { useContext } from 'react';
import titleImage from '../assets/Title.png.png';
import { IoMenu } from "react-icons/io5";
import { NavLink, Outlet } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext'; // Import the context

export default function RootLayout() {
  const { isLogin, toggleForm } = useContext(LoginContext); // Consume the context
  return (
    <div>
      <div className="wrapper">
        <img src={titleImage} alt="Logo" className="logo" />
        <ul className="nav-list">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="about">About</NavLink></li>
          <li><NavLink to="membership">Membership</NavLink></li>
          <li><NavLink to="contact">Contact</NavLink></li>
        </ul>
        <div className="right-content">
          <button className="nav-btn" onClick={toggleForm}>
            {isLogin ? "Sign Up" : "Back to Login"}
          </button>
          <IoMenu className="menu-icon" />
        </div>
      </div>
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
}
