import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./LoginForm.css"

const LoginForm = ({ toggleForm }) => {
    return (
        <div className="wrapper1 login" data-aos="fade-up-left" data-aos-duration="1400">
            <form>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" />
                    <FaLock className="icon" />
                </div>
                <button>Log In Now</button>
                <div className="new">
                    <p>Don't have an account yet?</p>
                    <p>-</p>
                    <button type="button" onClick={toggleForm} className="toggle-link">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
