import { useEffect, useState } from "react";
import { useTaskApi } from "../hooks/useTaskApi";

const CardLayout = () => {
  const { getUserTasks, updateTaskStatus } = useTaskApi();
  const [userId, setUserId] = useState(null);
  const [todoTasks, setTodoTasks] = useState([]);
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get userId from localStorage
  useEffect(() => {
    const fetchUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log("🔍 User retrieved:", parsedUser);
          if (parsedUser._id) {
            setUserId(parsedUser._id);
          } else {
            setError("User ID missing in localStorage!");
            console.error("❌ User ID missing in localStorage!");
          }
        } else {
          setError("No user data found in localStorage!");
          console.error("❌ No user data found in localStorage!");
        }
      } catch (err) {
        setError("Error retrieving user data!");
        console.error("❌ Error retrieving user data:", err);
      }
    };
    fetchUser();
  }, []);

  // Fetch tasks when userId is available
  useEffect(() => {
    const fetchTasks = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        console.log("📡 Fetching tasks for user:", userId);

        const tasks = await getUserTasks(userId);
        console.log("✅ Tasks received:", tasks);

        // Check if tasks is an array or if it's wrapped in a data property
        const taskArray = Array.isArray(tasks) ? tasks : tasks.data || [];

        if (!Array.isArray(taskArray)) {
          setError("Error: getUserTasks() did not return a valid data structure!");
          console.error("❌ Error: getUserTasks() did not return a valid data structure!");
          setLoading(false);
          return;
        }

        // Categorize tasks by status - only todo and on-progress
        setTodoTasks(taskArray.filter((t) => t.status === "todo"));
        setOngoingTasks(taskArray.filter((t) => t.status === "on-progress"));
        
        // Process upcoming deadlines (from todo and on-progress tasks)
        const activeTasks = taskArray.filter(t => 
          (t.status === "todo" || t.status === "on-progress") && t.dueDate
        );
        
        // Sort by due date (closest first)
        const sortedDeadlines = activeTasks.sort((a, b) => 
          new Date(a.dueDate) - new Date(b.dueDate)
        );
        
        setUpcomingDeadlines(sortedDeadlines);
      } catch (error) {
        setError(`Error fetching tasks: ${error.message}`);
        console.error("❌ Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId, getUserTasks]);

  // Update task status (Move to "On Progress")
  const startTask = async (task) => {
    try {
      await updateTaskStatus(task._id, "on-progress");
      
      // Update local state
      setTodoTasks(prev => prev.filter(t => t._id !== task._id));
      setOngoingTasks(prev => [...prev, { ...task, status: "on-progress" }]);
      
      // Update the task in upcomingDeadlines if it exists there
      setUpcomingDeadlines(prev => 
        prev.map(t => t._id === task._id ? { ...t, status: "on-progress" } : t)
      );
    } catch (error) {
      console.error("❌ Error updating task status:", error);
      alert("Failed to update task status. Please try again.");
    }
  };

  // Function to format due date with color coding based on urgency
  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let color = "#4caf50"; // Green (default)
    if (diffDays < 0) {
      color = "#f44336"; // Red (overdue)
    } else if (diffDays <= 2) {
      color = "#ff9800"; // Orange (due soon)
    }
    
    return {
      text: due.toLocaleDateString(),
      color
    };
  };

  // Styling
  const layoutStyle = {
    display: "grid",
    gridTemplateAreas: `"deadlines tasks"`,
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    padding: "20px",
    minHeight: "450px",
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
    height: "100%",
    overflow: "auto",
  };

  const taskItemStyle = {
    marginBottom: "10px",
    padding: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const buttonStyle = {
    backgroundColor: "#6c63ff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "0.8rem",
  };

  const deadlineStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px",
    borderRadius: "8px",
    marginBottom: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  };

  if (loading) return <div style={{ textAlign: "center", padding: "20px" }}>Loading tasks...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center", padding: "20px" }}>{error}</div>;

  return (
    <div style={layoutStyle}>
      {/* Deadlines Section */}
      <div style={{ gridArea: "deadlines" }}>
        <div style={cardStyle}>
          <h3 style={{ marginBottom: "15px", fontSize: "1.2rem", textAlign: "center" }}>Upcoming Deadlines</h3>
          {upcomingDeadlines.length > 0 ? (
            upcomingDeadlines.map((task) => {
              const dueInfo = formatDueDate(task.dueDate);
              return (
                <div key={task._id} style={deadlineStyle}>
                  <div>
                    <span style={{ fontWeight: "bold" }}>{task.title}</span>
                    <div style={{ fontSize: "0.8rem", display: "flex", alignItems: "center", marginTop: "4px" }}>
                      <span style={{ marginRight: "5px" }}>Status: {task.status === "todo" ? "To-Do" : "In Progress"}</span>
                      {dueInfo && (
                        <span style={{ 
                          color: dueInfo.color, 
                          fontWeight: "bold",
                          backgroundColor: "rgba(0,0,0,0.2)",
                          padding: "2px 6px",
                          borderRadius: "4px"
                        }}>
                          Due: {dueInfo.text}
                        </span>
                      )}
                    </div>
                  </div>
                  {task.status === "todo" && (
                    <button style={buttonStyle} onClick={() => startTask(task)}>
                      Start
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p style={{ textAlign: "center", fontStyle: "italic" }}>No upcoming deadlines.</p>
          )}
        </div>
      </div>

      {/* Tasks Section */}
      <div style={{ gridArea: "tasks" }}>
        {/* To-Do Tasks */}
        <div style={{ ...cardStyle, marginBottom: "15px" }}>
          <h3 style={{ marginBottom: "10px", fontSize: "1.2rem" }}>To-Do Tasks</h3>
          <div>
            {todoTasks.length > 0 ? (
              todoTasks.map((task) => {
                const dueInfo = formatDueDate(task.dueDate);
                return (
                  <div key={task._id} style={taskItemStyle}>
                    <div>
                      <span style={{ fontWeight: "bold" }}>{task.title}</span>
                      {dueInfo && (
                        <div style={{ fontSize: "0.8rem", color: dueInfo.color }}>
                          Due: {dueInfo.text}
                        </div>
                      )}
                    </div>
                    <button style={buttonStyle} onClick={() => startTask(task)}>
                      Start
                    </button>
                  </div>
                );
              })
            ) : (
              <p style={{ textAlign: "center", fontStyle: "italic" }}>No To-Do tasks available.</p>
            )}
          </div>
        </div>

        {/* Ongoing Tasks */}
        <div style={cardStyle}>
          <h3 style={{ marginBottom: "10px", fontSize: "1.2rem" }}>In Progress Tasks</h3>
          <div>
            {ongoingTasks.length > 0 ? (
              ongoingTasks.map((task) => {
                const dueInfo = formatDueDate(task.dueDate);
                return (
                  <div key={task._id} style={taskItemStyle}>
                    <div>
                      <span style={{ fontWeight: "bold" }}>{task.title}</span>
                      {dueInfo && (
                        <div style={{ fontSize: "0.8rem", color: dueInfo.color }}>
                          Due: {dueInfo.text}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ textAlign: "center", fontStyle: "italic" }}>No tasks in progress.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLayout;