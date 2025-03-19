import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const CardLayout = ({ projectId = null }) => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [deadlines, setDeadlines] = useState([]); // Stores tasks with due dates

  // Fetch tasks for the user in the specified project
  const fetchUserTasks = async (projectId) => {
    try {
      const token = cookies.get("token");
      if (!token) {
        throw new Error('No authentication token found');
      }

      // If projectId is null, we can skip fetching or fetch all tasks (optional)
      if (!projectId) {
        return []; // Return empty array if no projectId is provided
      }

      const response = await fetch(`http://localhost:5555/api/tasks/${projectId}/`, {
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

      return data.data || []; // Return the tasks array
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return []; // Return empty array on error
    }
  };

  // Update task status (e.g., to "on-progress" or "completed")
  const updateTaskStatus = async (taskId, status) => {
    try {
      const token = cookies.get("token");
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log("taskId:",taskId);

      const response = await fetch(`http://localhost:5555/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update task status');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error;
    }
  };

  // Fetch tasks when the component mounts or projectId changes
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await fetchUserTasks(projectId);
        setTodoTasks(tasks.filter((t) => t.status === "todo"));
        setOngoingTasks(tasks.filter((t) => t.status === "on-progress"));
        setCompletedTasks(tasks.filter((t) => t.status === "done"));
        setDeadlines(tasks.filter((t) => t.dueDate)); // Filter tasks with due dates
      } catch (error) {
        console.error('Error fetching tasks in CardLayout:', error);
        setTodoTasks([]);
        setOngoingTasks([]);
        setCompletedTasks([]);
        setDeadlines([]);
      }
    };
    fetchTasks();
  }, [projectId]); // Re-fetch tasks when projectId changes


  const startTask = async (task) => {
    try {
      await updateTaskStatus(task._id, "on-progress");
      setTodoTasks((prev) => prev.filter((t) => t._id !== task._id));
      setOngoingTasks((prev) => [...prev, { ...task, status: "on-progress" }]);
    } catch (error) {
      console.error('Error starting task:', error);
    }
  };

  // Move task to "Completed"
  const markAsCompleted = async (task) => {
    try {
      await updateTaskStatus(task._id, "done");
      setOngoingTasks((prev) => prev.filter((t) => t._id !== task._id));
      setCompletedTasks((prev) => [...prev, { ...task, status: "completed" }]);
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  const layoutStyle = {
    display: "grid",
    gridTemplateAreas: `"completion task updates" "status task updates"`,
    gridTemplateColumns: "1fr 1.5fr 1fr",
    gridTemplateRows: "1fr 1.5fr",
    gap: "10px",
    padding: "20px",
    height: "450px",
    fontFamily: "'Roboto Mono', serif",
  };

  const cardStyle = {
    backgroundColor: "#4c4847",
    borderRadius: "20px",
    padding: "15px",
    color: "white",
    fontFamily: "'Roboto Mono', serif",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={layoutStyle}>
      {/* Task Section */}
      <div style={{ display: "grid", gap: "10px", gridArea: "task" }}>
        {/* To-Do Tasks */}
        <div style={cardStyle}>
          <p>To-Do Tasks</p>
          <div>
            {todoTasks.length > 0 ? (
              todoTasks.map((task) => (
                <div key={task._id} style={{ marginBottom: "5px", display: "flex", justifyContent: "space-between" }}>
                  <span>{task.title}</span>
                  <button onClick={() => startTask(task)}>Start</button>
                </div>
              ))
            ) : (
              <p>No to-do tasks.</p>
            )}
          </div>
        </div>

        {/* Ongoing Tasks */}
        <div style={cardStyle}>
          <p>Ongoing Tasks</p>
          <div>
            {ongoingTasks.length > 0 ? (
              ongoingTasks.map((task) => (
                <div key={task._id} style={{ marginBottom: "5px", display: "flex", justifyContent: "space-between" }}>
                  <span>{task.title}</span>
                  <button onClick={() => markAsCompleted(task)}>Mark as Completed</button>
                </div>
              ))
            ) : (
              <p>No ongoing tasks.</p>
            )}
          </div>
        </div>

        {/* Completed Tasks */}
        <div style={cardStyle}>
          <p>Completed Tasks</p>
          <div>
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <div key={task._id} style={{ marginBottom: "5px" }}>
                  <span>{task.title} ✔️</span>
                </div>
              ))
            ) : (
              <p>No completed tasks.</p>
            )}
          </div>
        </div>
      </div>

      {/* Deadline Section */}
      <div style={cardStyle} gridArea="completion">
        <p>Upcoming Deadlines</p>
        <ul>
          {deadlines.length > 0 ? (
            deadlines.map((task) => (
              <li key={task._id}>
                {task.title} - Due: {new Date(task.dueDate).toLocaleDateString()}
              </li>
            ))
          ) : (
            <p>No upcoming deadlines.</p>
          )}
        </ul>
      </div>

      <div style={cardStyle} gridArea="status">
        <p>Teammates Status</p>
      </div>

      <div style={cardStyle} gridArea="updates">
        <p>Notes</p>
      </div>
    </div>
  );
};

export default CardLayout;