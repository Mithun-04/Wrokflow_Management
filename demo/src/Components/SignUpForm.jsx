import React from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const SignUpForm = ({ toggleForm }) => {
    return (
        <div className="wrapper1 signup" data-aos="fade-up-left" data-aos-duration="1400">
            <form>
                <h1>Sign Up</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="email" placeholder="Email" />
                    <FaEnvelope className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" />
                    <FaLock className="icon" />
                </div>
                <button>Create Account</button>
                <div className="new">
                    <p>Already have an account?</p>
                    <p>-</p>
                    <button type="button" onClick={toggleForm} className="toggle-link">
                        Login Here
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
