import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export const useTaskApi = () => {
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch all tasks assigned to the user
  const getUserTasks = async (userId) => {
    try {
      // Pass the userId as a query parameter
      const res = await axios.get(`${API_URL}?userId=${userId}`, config);
      return res.data;
    } catch (error) {
      console.error("Error fetching user tasks:", error);
      throw error;
    }
  };

  // Update Task Status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const res = await axios.put(`${API_URL}/${taskId}`, { status: newStatus }, config);
      return res.data;
    } catch (error) {
      console.error("Error updating task status:", error);
      throw error;
    }
  };

  return { getUserTasks, updateTaskStatus };
};