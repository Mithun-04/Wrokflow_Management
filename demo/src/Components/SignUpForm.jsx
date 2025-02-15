import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import "../styles/LoginForm.css";

const SignUpForm = ({ toggleForm }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        try {
            const response = await fetch("http://localhost:5000/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.msg || "Signup failed");
            }
            
            setSuccess(true);
            alert("Account created successfully! Please log in.");
            toggleForm(); // Switch to login form
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="wrapper1 signup" data-aos="fade-up-left" data-aos-duration="1400">
            <form onSubmit={handleSignUp}>
                <h1>Sign Up</h1>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FaEnvelope className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className="icon" />
                </div>
                <button type="submit">Create Account</button>
                <div className="new">
                    <p>Already have an account?</p>
                    <button type="button" onClick={toggleForm} className="toggle-link">
                        Login Here
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
