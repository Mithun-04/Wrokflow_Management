import '../styles/DashBoard.css'
import { RiAccountCircleLine } from "react-icons/ri";
import CardLayout from './Taskprogress';
import Carousel from './projects';
import addicon from '../assets/add.png';

function DashBoard() {
  return (
    <div className='dashboard-container'>
        <div className='dashboard-topbar'>
            <h1>Dashboard</h1> 

            <div className='icons'> 
              <div className='addicon'>
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
    </div>    
  )
}

export default DashBoard;
