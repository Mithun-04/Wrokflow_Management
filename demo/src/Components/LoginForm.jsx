import React from 'react';
import "./LoginForm.css"; // Reuse the same CSS file
import { FaUser, FaLock, FaEye, FaEnvelope } from "react-icons/fa";

const AuthForm = ({ isLogin, toggleForm }) => {
    return (
        <div className={`wrapper1 ${isLogin ? "login" : "signup"}`} data-aos={`${isLogin ? "fade-up-left" : "filp-left"}`} data-aos-duration="1400">
            <form>
                <h1>{isLogin ? "Login" : "Sign Up"}</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" />
                    <FaUser className="icon" />
                </div>
                {!isLogin && (
                    <div className="input-box">
                        <input type="email" placeholder="Email" />
                        <FaEnvelope className="icon" />
                    </div>
                )}
                <div className="input-box">
                    <input type="password" placeholder="Password" />
                    <FaLock className="icon" />
                </div>
                
                {/* Update button text based on the form type */}
                <button>{isLogin ? "Log In Now" : "Create Account"}</button>

                <div className="new">
                    {isLogin ? (
                        <>
                            <p>Don't have an account yet?</p>
                            <p>-</p>
                            <button type="button" onClick={toggleForm} className="toggle-link">
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Already have an account?</p>
                            <p>-</p>
                            <button type="button" onClick={toggleForm} className="toggle-link">
                                Login Here
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
