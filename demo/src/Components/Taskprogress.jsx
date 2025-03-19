import { useEffect, useState } from "react";

// Function to get token from cookies
const getTokenFromCookies = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith("token="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
};

const CardLayout = () => {
    const [todoTasks, setTodoTasks] = useState([]);
    const [ongoingTasks, setOngoingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [deadlines, setDeadlines] = useState([]);

    // Fetch tasks from the backend
    useEffect(() => {
        const fetchTasks = async () => {
            const token = getTokenFromCookies();
            if (!token) return;

            try {
                const response = await fetch("/api/tasks/", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                    credentials: "include",
                });

                if (!response.ok) throw new Error("Failed to fetch tasks");

                const tasks = await response.json();
                setTodoTasks(tasks.filter((t) => t.status === "to-do"));
                setOngoingTasks(tasks.filter((t) => t.status === "on-progress"));
                setCompletedTasks(tasks.filter((t) => t.status === "completed"));
                setDeadlines(tasks.filter((t) => t.dueDate));
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    // Update task status
    const updateTaskStatus = async (taskId, status) => {
        const token = getTokenFromCookies();
        if (!token) return;

        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({ status }),
            });

            if (!response.ok) throw new Error("Failed to update task");

            const updatedTask = await response.json();

            // Update state based on new status
            if (status === "on-progress") {
                setTodoTasks((prev) => prev.filter((t) => t._id !== taskId));
                setOngoingTasks((prev) => [...prev, { ...updatedTask.data }]);
            } else if (status === "completed") {
                setOngoingTasks((prev) => prev.filter((t) => t._id !== taskId));
                setCompletedTasks((prev) => [...prev, { ...updatedTask.data }]);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // Styles
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
                                <button onClick={() => updateTaskStatus(task._id, "on-progress")}>Start</button>
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
                                <button onClick={() => updateTaskStatus(task._id, "completed")}>Mark as Completed</button>
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
                        <li key={task._id}>{task.title} - Due: {new Date(task.dueDate).toLocaleDateString()}</li>
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
