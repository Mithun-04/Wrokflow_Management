import React from "react";
import "../styles/popup.css";

function Popup() {
  return (
    <div className="popup">
      <button className="close-btn">✖</button>
      <h1>Create Project</h1>
      <form>
        <label htmlFor="project-name">Project Name:</label>
        <input type="text" id="project-name" name="project-name" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Popup;
