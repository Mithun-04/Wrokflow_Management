
import '../styles/DashBoard.css'
import { RiAccountCircleLine } from "react-icons/ri";
import CardLayout from './Taskprogress';
import Carousel from './projects';
import { useNavigate } from "react-router-dom"; 
import profile from './profile';

function DashBoard() {
  const navigate = useNavigate();
  return (
    <div className='dashboard-container'>
        <div className='dashboard-topbar'>
            <h1>Dashboard</h1>
            
        <RiAccountCircleLine
          onClick={() => navigate("/profile")}
          className="profile-icon"
        />

        </div>
        
        <div className="dashboard-leftbar">

        </div>
        
        
    </div>    

  )
}

export default DashBoard