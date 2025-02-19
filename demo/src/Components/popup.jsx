import React from "react";
import "../styles/popup.css";

function Popup({ setModal }) {
  return (
    <div className="popup-container">
      <button className="popup-close-btn" onClick={() => setModal(false)}>✖</button>
      <h1 className="popup-title">Create Project</h1>
      <form className="popup-form">
        <label className="popup-label" htmlFor="project-name">Project Name:</label>
        <input className="popup-input" type="text" id="project-name" name="project-name" required />
        <button className="popup-submit-btn" type="submit" onClick={() => setModal(false)}>Submit</button>
      </form>
    </div>
  );
}

export default Popup;