import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { supabase } from "./supabaseClient"; // Import Supabase client

const SignUpForm = ({ toggleForm }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            setError(error.message);
        } else {
            alert("Account created successfully! Please log in.");
            toggleForm(); // Switch to login form after successful signup
        }
    };

    return (
        <div className="wrapper1 signup" data-aos="fade-up-left" data-aos-duration="1400">
            <form onSubmit={handleSignUp}>
                <h1>Sign Up</h1>
                {error && <p className="error">{error}</p>}
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FaEnvelope className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className="icon" />
                </div>
                <button type="submit">Create Account</button>
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
