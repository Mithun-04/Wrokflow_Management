import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export const useTaskApi = () => {
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch all tasks assigned to the user
  const getUserTasks = async () => {
    const res = await axios.get(`${API_URL}/user`, config);
    return res.data;
  };

  // Update Task Status
  const updateTaskStatus = async (taskId, newStatus) => {
    const res = await axios.put(`${API_URL}/${taskId}`, { status: newStatus }, config);
    return res.data;
  };

  return { getUserTasks, updateTaskStatus };
};
