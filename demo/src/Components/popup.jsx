import React from "react";
import "../styles/popup.css";

function Popup({ setModal }) {
  return (
    <div className="popup">
      <button className="close-btn" onClick={() => setModal(false)}>✖</button>
      <h1>Create Project</h1>
      <form>
        <label htmlFor="project-name">Project Name:</label>
        <input type="text" id="project-name" name="project-name" required />
        <button type="submit" onClick={() => setModal(false)}>Submit</button>
      </form>
    </div>
  );
}

export default Popup;
