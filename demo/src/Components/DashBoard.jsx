import React from 'react'
import '../styles/DashBoard.css'
import { RiAccountCircleLine } from "react-icons/ri";
import CardLayout from './Taskprogress';

function DashBoard() {
  return (
    <div className='dashboard-container'>
        <div className='dashboard-topbar'>
        <h1 className='dashboard-title'>Dashboard</h1>
       
            
            
            <RiAccountCircleLine className='profile-icon' /> 

        </div>
        
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "20px" }}>
            <CardLayout />
        </div>
        <div className="dashboard-leftbar">
        

        </div>
    </div>

  )
}

export default DashBoard