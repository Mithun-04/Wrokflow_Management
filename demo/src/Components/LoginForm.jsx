import React, { useState, useContext } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "../styles/LoginForm.css";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ toggleForm }) => {
    const { login } = useContext(LoginContext);
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                alert(data.msg || "Login failed");
                return;
            }
            
            localStorage.setItem("token", data.token);
            login(); // Call context login function
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
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
                    <button type="button" onClick={toggleForm} className="toggle-link">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
