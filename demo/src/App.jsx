import React, { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { LoginProvider } from "./context/LoginContext";
import Home from "./Components/Home.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/Home.css";
import RootLayout from "./layouts/RootLayout.jsx";
import About from "./Components/About.jsx";
import Contact from "./Components/ContactUs.jsx";
import Dashboard from "./Components/DashBoard.jsx";
import ProtectedRoute from "./Components/ProtectedRoute"; // Import the ProtectedRoute component
import Popup from "./Components/popup.jsx";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1400, once: false });
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </>
    )
  );

  return (
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
    //<Popup/>
  );
};

export default App;