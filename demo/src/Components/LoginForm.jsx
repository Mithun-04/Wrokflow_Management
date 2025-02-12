import React, { useState, useContext } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "../styles/LoginForm.css";
import { supabase } from "./supabaseClient";
import { LoginContext } from "../context/LoginContext"; // Import LoginContext
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginForm = ({ toggleForm }) => {
    const { login } = useContext(LoginContext); // Get login function from context
    const navigate = useNavigate(); // Initialize navigation

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        console.log("Login attempt with:", email, password); // Debugging

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        console.log("Response:", data, error); // Debugging

        if (error) {
            if (error.message.includes("Invalid login credentials")) {
                alert("Incorrect email or password. Please try again.");
            } else {
                alert("Something went wrong. Please try again.");
            }
        } else {
            login(); // Call the login function from LoginContext
            navigate("/dashboard"); // Redirect to dashboard
        }
    };

    return (
        <div className="wrapper1 login" data-aos="fade-up-left" data-aos-duration="1400">
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FaUser className="icon" />
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
                <button type="submit">Log In Now</button>
                <div className="new">
                    <p>Don&apos;t have an account yet?</p>
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