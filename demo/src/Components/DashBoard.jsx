import React from 'react'
import '../styles/DashBoard.css'
import { RiAccountCircleLine } from "react-icons/ri";

function DashBoard() {
  return (
    <div className='dashboard-container'>
        <div className='dashboard-topbar'>
            <h1>Dashboard</h1>
            
            <RiAccountCircleLine className='profile-icon' /> 

        </div>
        
        <div className="dashboard-leftbar">

        </div>
        
        
    </div>

  )
}

export default DashBoard