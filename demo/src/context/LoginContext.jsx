import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin((prev) => !prev);

  return (
    <LoginContext.Provider value={{ isLogin, toggleForm }}>
      {children}
    </LoginContext.Provider>
  );
};
