import  { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext"; // Import LoginContext

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(LoginContext); // Check if user is authenticated

  if (!isAuthenticated) {
    // Redirect to home page if not authenticated
    return <Navigate to="/" replace />;
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;