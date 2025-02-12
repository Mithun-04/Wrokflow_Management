import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true); // For toggling between login/signup forms
  const [isAuthenticated, setIsAuthenticated] = useState(false); // For tracking login status

  const toggleForm = () => setIsLogin((prev) => !prev);

  // Functions to manage authentication state
  const login = () => setIsAuthenticated(true); // Mark user as authenticated
  const logout = () => setIsAuthenticated(false); // Mark user as not authenticated

  return (
    <LoginContext.Provider
      value={{ isLogin, toggleForm, isAuthenticated, login, logout }}
    >
      {children}
    </LoginContext.Provider>
  );
};