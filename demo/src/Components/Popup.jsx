import React, { useState } from "react";
import "../styles/popup.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Popup({ setModal }) {
  const [projectname, setProjectname] = useState("");
  const [error, setError] = useState("");

  const token = cookies.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5555/api/projects/", {
        method: "POST",
        headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json" },
        body: JSON.stringify({ projectname }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        alert(data.msg || "Project Creation failed");
        return;
      }
      setModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="Dummy">
      <div className="overlay"></div>
      <div className="popup-container">
        <button className="popup-close-btn" onClick={() => setModal(false)}>✖</button>
        <h1 className="popup-title">Create Project</h1>
        
        <form className="popup-form" onSubmit={handleSubmit}>
          <label className="popup-label" htmlFor="project-name">Project Name:</label>
          <input 
            className="popup-input" 
            type="text" 
            id="project-name" 
            name="project-name" 
            value={projectname} 
            onChange={(e) => setProjectname(e.target.value)} 
            required 
          />
          
          {error && <p className="error-message">{error}</p>}

          <button className="popup-submit-btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Popup;
