import { useEffect, useState } from "react";
import { useTaskApi } from "../hooks/useTaskApi";

const CardLayout = () => {
  const { getUserTasks, updateTaskStatus } = useTaskApi();
  const [todoTasks, setTodoTasks] = useState([]);
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [deadlines, setDeadlines] = useState([]); // Stores tasks with due dates

  // Fetch tasks from backend on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getUserTasks();
      setTodoTasks(tasks.filter((t) => t.status === "to-do"));
      setOngoingTasks(tasks.filter((t) => t.status === "on-progress"));
      setCompletedTasks(tasks.filter((t) => t.status === "completed"));
      setDeadlines(tasks.filter((t) => t.dueDate)); // Filter tasks with due dates
    };
    fetchTasks();
  }, []);

  // Move task to "On Progress"
  const startTask = async (task) => {
    await updateTaskStatus(task._id, "on-progress");
    setTodoTasks((prev) => prev.filter((t) => t._id !== task._id));
    setOngoingTasks((prev) => [...prev, { ...task, status: "on-progress" }]);
  };

  // Move task to "Completed"
  const markAsCompleted = async (task) => {
    await updateTaskStatus(task._id, "completed");
    setOngoingTasks((prev) => prev.filter((t) => t._id !== task._id));
    setCompletedTasks((prev) => [...prev, { ...task, status: "completed" }]);
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
            {todoTasks.map((task) => (
              <div key={task._id} style={{ marginBottom: "5px", display: "flex", justifyContent: "space-between" }}>
                <span>{task.title}</span>
                <button onClick={() => startTask(task)}>Start</button>
              </div>
            ))}
          </div>
        </div>

        {/* Ongoing Tasks */}
        <div style={cardStyle}>
          <p>Ongoing Tasks</p>
          <div>
            {ongoingTasks.map((task) => (
              <div key={task._id} style={{ marginBottom: "5px", display: "flex", justifyContent: "space-between" }}>
                <span>{task.title}</span>
                <button onClick={() => markAsCompleted(task)}>Mark as Completed</button>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Tasks */}
        <div style={cardStyle}>
          <p>Completed Tasks</p>
          <div>
            {completedTasks.map((task) => (
              <div key={task._id} style={{ marginBottom: "5px" }}>
                <span>{task.title} ✔️</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deadline Section */}
      <div style={cardStyle} gridArea="completion">
        <p>Upcoming Deadlines</p>
        <ul>
          {deadlines.map((task) => (
            <li key={task._id}>
              {task.title} - Due: {new Date(task.dueDate).toLocaleDateString()}
            </li>
          ))}
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
