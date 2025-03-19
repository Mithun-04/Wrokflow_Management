import { useState, useEffect } from "react";
import axios from "axios";

function TaskManager() {
    const [tasks, setTasks] = useState([]); // Stores the list of tasks
    const [task, setTask] = useState({ title: "", description: "" }); // Stores user input

    // Function to handle input field changes
    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    // Function to send the task to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task.title.trim() || !task.description.trim()) return; // Prevent empty submissions

        try {
            const response = await axios.post("http://localhost:5000/tasks", task);
            setTasks([...tasks, response.data]); // Update UI with new task
            setTask({ title: "", description: "" }); // Reset input fields
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // Function to fetch tasks from backend
    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Fetch tasks when the component loads
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div style={{ textAlign: "center", margin: "20px" }}>
            <h1>Task Manager</h1>

            {/* Form to add new task */}
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={task.title}
                    onChange={handleChange}
                    required
                    style={{ margin: "5px", padding: "5px" }}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Task Description"
                    value={task.description}
                    onChange={handleChange}
                    required
                    style={{ margin: "5px", padding: "5px" }}
                />
                <button type="submit" style={{ padding: "5px 10px" }}>Add Task</button>
            </form>

            {/* Display list of tasks */}
            <h2>Task List</h2>
            {tasks.length > 0 ? (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {tasks.map((t, index) => (
                        <li key={index} style={{ margin: "10px", padding: "10px", border: "1px solid #ddd" }}>
                            <strong>{t.title}</strong> - {t.description}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tasks available.</p>
            )}
        </div>
    );
}

export default TaskManager;
