import { useEffect, useState } from 'react';
import '../styles/DashBoard.css';
import { RiAccountCircleLine } from "react-icons/ri";
import { GoInbox } from "react-icons/go";
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
  const [menuOpen, setMenuOpen] = useState({}); // Track which project's menu is open
  const [taskInputs, setTaskInputs] = useState({}); // Track task assignment form state
  const [error, setError] = useState(null);
  const [invitations, setInvitations] = useState([]);
  const [showInvitationDialog, setShowInvitationDialog] = useState(false);
  const [projectDetails, setProjectDetails] = useState({});
  const [tasks, setTasks] = useState({}); // Store tasks for each project
  const [showTasksDialog, setShowTasksDialog] = useState({});
  const [selectedProjectId, setSelectedProjectId] = useState(null); // Track the selected project for tasks// Control tasks dialog visibility

  useEffect(() => {
    if (
      modal ||
      showInvitationDialog ||
      Object.values(inviteInputs).some(input => input?.show) ||
      Object.values(taskInputs).some(input => input?.show) ||
      Object.values(showTasksDialog).some(show => show)
    ) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [modal, showInvitationDialog, inviteInputs, taskInputs, showTasksDialog]);


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
    if (modal || showInvitationDialog || Object.values(inviteInputs).some(input => input?.show) || Object.values(taskInputs).some(input => input?.show)) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [modal, showInvitationDialog, inviteInputs, taskInputs]);

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
      setInviteInputs({});
      setTaskInputs({});
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Error loading projects');
      setProjects([]);
    }
  };
  const fetchProjectDetails = async (projectId) => {
    try {
      const token = cookies.get("token");
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`http://localhost:5555/api/projects/${projectId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error(`Failed to fetch project details: ${errorText}`);
      }

      const data = await response.json();
      console.log('Fetched project details:', data);

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch project details');
      }

      setProjectDetails(prev => ({
        ...prev,
        [projectId]: data.data || {}
      }));
    } catch (error) {
      console.error('Error fetching project details:', error);
      setError('Failed to load project details');
      setProjectDetails(prev => ({
        ...prev,
        [projectId]: null // Set to null to indicate failure
      }));
    }
  };
  const toggleMenu = (projectId) => {
    setMenuOpen(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
    // Close any open dialogs when toggling the menu
    setInviteInputs(prev => ({
      ...prev,
      [projectId]: { ...prev[projectId], show: false }
    }));
    setTaskInputs(prev => ({
      ...prev,
      [projectId]: { ...prev[projectId], show: false }
    }));
  };

  const showProjectTasks = (projectId) => {
    setSelectedProjectId(projectId);
    setMenuOpen(prev => ({
      ...prev,
      [projectId]: false
    }));
  };

  const toggleInvite = (projectId) => {
    setInviteInputs(prev => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        show: !prev[projectId]?.show
      }
    }));
    setMenuOpen(prev => ({
      ...prev,
      [projectId]: false
    }));
  };
  const toggleTaskAssign = async (projectId) => {
    await fetchProjectDetails(projectId);
    setTaskInputs(prev => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        show: !prev[projectId]?.show
      }
    }));
    setMenuOpen(prev => ({
      ...prev,
      [projectId]: false
    }));
  };

  const toggleShowTasks = (projectId) => {
    if (!showTasksDialog[projectId]) {
      fetchUserTasks(projectId); // Fetch tasks when opening the dialog
    } else {
      setShowTasksDialog(prev => ({
        ...prev,
        [projectId]: false
      }));
    }
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

  const assignTask = async (projectId) => {
    const taskData = taskInputs[projectId] || {};
    const { memberId, taskName, taskDescription, priority, dueDate } = taskData;

    console.log(taskData);

    if (!memberId || !taskName || !taskDescription || !priority || !dueDate) {
      alert('Please fill in all task details');
      return;
    }

    try {
      const token = cookies.get("token");
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`http://localhost:5555/api/tasks/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: taskName,
          description: taskDescription,
          projectId: projectId,
          assignedTo: memberId,
          priority: priority,
          dueDate: dueDate
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server response:', errorData);
        throw new Error(errorData.error || `Failed to assign task: ${response.statusText}`);
      }

      alert('Task assigned successfully!');
      setTaskInputs(prev => ({
        ...prev,
        [projectId]: { show: false, memberId: '', taskName: '', taskDescription: '', priority: '', dueDate: '' }
      }));
    } catch (error) {
      console.error('Error assigning task:', error);
      alert(`Failed to assign task: ${error.message}`);
    }
  };

  const handleInputChange = (projectId, value) => {
    setInviteInputs(prev => ({
      ...prev,
      [projectId]: { ...prev[projectId], value }
    }));
  };

  const handleTaskInputChange = (projectId, field, value) => {
    setTaskInputs(prev => ({
      ...prev,
      [projectId]: { ...prev[projectId], [field]: value }
    }));
  };

  const fetchUserInvitations = async () => {
    try {
      const token = cookies.get("token");
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:5555/api/invite/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch invitations');
      }

      const data = await response.json();
      console.log('Fetched invitations:', data);

      const invitationList = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
      setInvitations(invitationList);
      setShowInvitationDialog(true);
    } catch (error) {
      console.error('Error fetching invitations:', error);
      setError('Failed to load invitations');
      setInvitations([]);
    }
  };

  const handleAcceptInvitation = async (invitationId) => {
    try {
      const token = cookies.get("token");

      if (!token) {
        throw new Error('Authentication error');
      }

      const response = await fetch(`http://localhost:5555/api/invite/accept/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ invitationId })
      });

      if (!response.ok) {
        throw new Error('Failed to accept invitation');
      }

      setInvitations(prev => prev.filter(inv => inv._id !== invitationId));
      alert('Invitation accepted successfully!');
    } catch (error) {
      console.error('Error accepting invitation:', error);
      alert(`Failed to accept invitation: ${error.message}`);
    }
  };

  const handleDeclineInvitation = async (invitationId) => {
    try {
      const token = cookies.get("token");

      if (!token) {
        throw new Error('Authentication error');
      }

      const response = await fetch(`http://localhost:5555/api/invite/decline`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ invitationId })
      });

      if (!response.ok) {
        throw new Error('Failed to decline invitation');
      }

      setInvitations(prev => prev.filter(inv => inv._id !== invitationId));
      alert('Invitation declined successfully!');
    } catch (error) {
      console.error('Error declining invitation:', error);
      alert(`Failed to decline invitation: ${error.message}`);
    }
  };
  const fetchUserTasks = async (projectId) => {
    try {
      const token = cookies.get("token");
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`http://localhost:5555/api/tasks/${projectId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server response:', errorData);
        throw new Error(errorData.error || `Failed to fetch tasks: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Fetched tasks:', data);

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch tasks');
      }

      setTasks(prev => ({
        ...prev,
        [projectId]: data.data || []
      }));
      setShowTasksDialog(prev => ({
        ...prev,
        [projectId]: true
      }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks');
      setTasks(prev => ({
        ...prev,
        [projectId]: []
      }));
    }
  };

  return (
    <div className='dashboard-container'>
      <div className='dashboard-topbar'>
        <h1>{username}'s Dashboard</h1>
        <div className='icons'>
          <GoInbox className='inbox' onClick={fetchUserInvitations} />
          <div className='addicon' onClick={() => setModal(true)}>
            <img src={addicon} alt="Add" />
          </div>
          <RiAccountCircleLine className='profile-icon' />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", padding: "100px" }}>
        <CardLayout projectId={selectedProjectId} />
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
                onClick={() => toggleMenu(project._id)}
              >
                ⋯
              </span>
              {menuOpen[project._id] && (
                <div className="action-menu">
                  <button onClick={() => toggleInvite(project._id)} className="menu-option">
                    Invite Members
                  </button>
                  <button onClick={() => toggleTaskAssign(project._id)} className="menu-option">
                    Assign Task
                  </button>
                  <button onClick={() => showProjectTasks(project._id)} className="menu-option">
                    Show My Tasks
                  </button>
                </div>
              )}
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
              {taskInputs[project._id]?.show && (
                <>
                  <div className="overlay" onClick={() => toggleTaskAssign(project._id)} />
                  <div className="invite-modal">
                    <div className="invite-content">
                      <select
                        value={taskInputs[project._id]?.memberId || ''}
                        onChange={(e) => handleTaskInputChange(project._id, 'memberId', e.target.value)}
                        className="invite-input"
                      >
                        <option value="">Select a member</option>
                        {projectDetails[project._id]?.members?.length > 0 ? (
                          projectDetails[project._id].members.map(member => (
                            <option key={member.userId._id} value={member.userId._id}>
                              {member.userId.name || member.userId.email || member.userId._id}
                            </option>
                          ))
                        ) : projectDetails[project._id] ? (
                          <option disabled>No members in this project</option>
                        ) : (
                          <option disabled>Loading members...</option>
                        )}
                      </select>
                      <input
                        type="text"
                        placeholder="Task name"
                        value={taskInputs[project._id]?.taskName || ''}
                        onChange={(e) => handleTaskInputChange(project._id, 'taskName', e.target.value)}
                        className="invite-input"
                      />
                      <textarea
                        placeholder="Task description"
                        value={taskInputs[project._id]?.taskDescription || ''}
                        onChange={(e) => handleTaskInputChange(project._id, 'taskDescription', e.target.value)}
                        className="invite-input task-description"
                      />
                      <select
                        value={taskInputs[project._id]?.priority || 'Medium'}
                        onChange={(e) => handleTaskInputChange(project._id, 'priority', e.target.value)}
                        className="invite-input"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <input
                        type="date"
                        value={taskInputs[project._id]?.dueDate || ''}
                        onChange={(e) => handleTaskInputChange(project._id, 'dueDate', e.target.value)}
                        className="invite-input"
                      />
                      <button
                        onClick={() => assignTask(project._id)}
                        className="invite-button"
                        disabled={!projectDetails[project._id]?.members?.length}
                      >
                        Assign Task
                      </button>
                    </div>
                  </div>
                </>
              )}
              {/* {showTasksDialog[project._id] && (
                <>
                  <div className="overlay" onClick={() => toggleShowTasks(project._id)} />
                  <div className="invite-modal">
                    <div className="invite-content">
                      <h2>My Tasks in {project.name}</h2>
                      {tasks[project._id]?.length > 0 ? (
                        tasks[project._id].map(task => (
                          <div key={task._id} className="task-item">
                            <p><strong>Title:</strong> {task.title}</p>
                            <p><strong>Description:</strong> {task.description}</p>
                            <p><strong>Assigned To:</strong> {task.assignedTo?.name || task.assignedTo?.email || 'Unknown'}</p>
                            <p><strong>Priority:</strong> {task.priority || 'Not set'}</p>
                            <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</p>
                          </div>
                        ))
                      ) : (
                        <p>No tasks assigned to you in this project.</p>
                      )}
                    </div>
                  </div>
                </>
              )} */}
            </div>
          ))}
        </div>
      </div>
      {showInvitationDialog && (
        <>
          <div className="overlay" onClick={() => setShowInvitationDialog(false)} />
          <div className="invite-modal">
            <h2>Pending Invitations</h2>
            {Array.isArray(invitations) && invitations.length === 0 ? (
              <p>No pending invitations</p>
            ) : (
              Array.isArray(invitations) ? (
                invitations.map(invitation => (
                  <div key={invitation._id} className="invitation-item">
                    <p>Project: {invitation.projectId?.name || invitation.projectId?._id || 'Unknown'}</p>
                    <p>Role: {invitation.role}</p>
                    <div className="invitation-actions">
                      <button
                        onClick={() => handleAcceptInvitation(invitation._id)}
                        className="invite-button accept"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDeclineInvitation(invitation._id)}
                        className="invite-button decline"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Error: Invalid invitation data</p>
              )
            )}
          </div>
        </>
      )}
      {modal && <Popup setModal={setModal} />}
    </div>
  );
}

export default DashBoard;