import React, { useState } from "react";
import '../styles/DashBoard.css';
import { RiAccountCircleLine } from "react-icons/ri";
import CardLayout from './Taskprogress';
import Carousel from './projects';
import addicon from '../assets/add.png';
import Popup from "./popup.jsx"; // Import Popup

function DashBoard() {
  const [modal, setModal] = useState(false); // Manage popup state in Dashboard

  return (
    <div className='dashboard-container'>
        <div className='dashboard-topbar'>
            <h1>Dashboard</h1> 

            <div className='icons'> 
              <div className='addicon' onClick={() => setModal(true)}> 
                <img src={addicon} alt="Add"/>
              </div>
              <RiAccountCircleLine className='profile-icon' /> 
            </div>
        </div>  

        <div style={{ display: "flex", alignItems:"center"}}>
            <CardLayout />
        </div>
        
        <Carousel />

        <div className="dashboard-leftbar"></div>

        {modal && <Popup setModal={setModal} />} {/* Render popup conditionally */}
    </div>    
  )
}

export default DashBoard;
