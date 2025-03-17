import '../styles/DashBoard.css'
import { RiAccountCircleLine } from "react-icons/ri";
import { useEffect, useState } from 'react';
import CardLayout from './Taskprogress';
import Carousel from './projects';
import addicon from '../assets/add.png';
import Popup from './Popup';

function DashBoard() {
  const [username, setUsername] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Token being sent:", token);

        if (!token) {
          console.error('No token found in localStorage');
          return;
        }
        const response = await fetch('http://localhost:5555/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Send JWT in Authorization header
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUsername(data.username); // Assuming API returns { username: "JohnDoe" }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='dashboard-container'>
      <div className='dashboard-topbar'>
        <h1>{username}'s Dashboard</h1>
        <div className='icons'>
          <div className='addicon' onClick={() => setModal(true)}>
            <img src={addicon} alt="Add" />
          </div>
          <RiAccountCircleLine className='profile-icon' />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <CardLayout />
      </div>
      <Carousel />
      <div className="dashboard-leftbar"></div>
      {modal && <Popup setModal={setModal} />}
    </div>
  );
}

export default DashBoard;
