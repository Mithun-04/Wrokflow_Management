import { useEffect, useState } from 'react';
import '../styles/DashBoard.css';
import { RiAccountCircleLine } from "react-icons/ri";
import CardLayout from './Taskprogress';
import Carousel from './projects';
import addicon from '../assets/add.png';
import Popup from './Popup';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function DashBoard() {
  const [username, setUsername] = useState('');
  const [modal, setModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [inviteInputs, setInviteInputs] = useState({}); // Track invite form state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = cookies.get("token");
        console.log("Token being sent:", token);

        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch('http://localhost:5555/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (modal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [modal]);

  const fetchProject = async () => {
    try {
      const token = cookies.get("token");
      console.log("Token being sent:", token);

      if (!token) {
        console.error('No token found');
        setError('No token found');
        return;
      }

      const response = await fetch('http://localhost:5555/api/projects/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data.data || []);
      setError(null);
      setInviteInputs({}); // Reset invite inputs when fetching new projects
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Error loading projects');
      setProjects([]);
    }
  };

  const toggleInvite = (projectId) => {
    setInviteInputs(prev => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        show: !prev[projectId]?.show
      }
    }));
  };

  const inviteMembers = async (projectId) => {
    const memberNamesInput = inviteInputs[projectId]?.value || '';
    const memberNames = memberNamesInput.split(',').map(name => name.trim()).filter(name => name);

    if (memberNames.length === 0) {
      alert('Please enter at least one valid member name');
      return;
    }

    try {
      const token = cookies.get("token");
      if (!token) {
        throw new Error('No authentication token found');
      }

      const invitations = memberNames.map(name => ({
        name: name,
        role: "member"
      }));

      console.log('Sending request body:', invitations);

      const response = await fetch(`http://localhost:5555/api/projects/${projectId}/invite`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invitations)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error(`Failed to invite members: ${errorText}`);
      }

      alert(`${memberNames.length} member(s) invited successfully!`);
      setInviteInputs(prev => ({
        ...prev,
        [projectId]: { show: false, value: '' }
      }));
    } catch (error) {
      console.error('Error inviting members:', error);
      alert(`Failed to invite members: ${error.message}`);
    }
  };

  const handleInputChange = (projectId, value) => {
    setInviteInputs(prev => ({
      ...prev,
      [projectId]: { ...prev[projectId], value }
    }));
  };

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
      <div className="dashboard-leftbar">
        <button className='button' onClick={fetchProject}>
          Show my Projects
        </button>
        <div id="projectsContainer">
          {error && <p>{error}</p>}
          {projects.length === 0 && !error && <p>No projects found</p>}
          {projects.map(project => (
            <div key={project._id} className="project-item">
              <h3>{project.name}</h3>
              <span 
                className="menu-dots" 
                onClick={() => toggleInvite(project._id)}
              >
                ⋯
              </span>
              {inviteInputs[project._id]?.show && (
                <>
                  <div className="overlay" onClick={() => toggleInvite(project._id)} />
                  <div className="invite-modal">
                    <div className="invite-content">
                      <input
                        type="text"
                        placeholder="Enter names (comma-separated)"
                        value={inviteInputs[project._id]?.value || ''}
                        onChange={(e) => handleInputChange(project._id, e.target.value)}
                        className="invite-input"
                      />
                      <button
                        onClick={() => inviteMembers(project._id)}
                        className="invite-button"
                      >
                        Invite
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      {modal && <Popup setModal={setModal} />}
    </div>
  );
}

export default DashBoard;