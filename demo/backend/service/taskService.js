import Task from "../models/Task.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// Create Task (Manager Only)
const createTask = async ({ title, description, projectId, assignedTo, priority, dueDate, createdBy }) => {
    const user = await User.findById(assignedTo);
    if (!user) {
        throw new Error("Assigned user not found");
    }

    const task = new Task({
        title,
        description,
        projectId,
        assignedTo,
        priority,
        dueDate,
        createdBy,
    });

    return await task.save();
};

// Get All Tasks in a Project
const getProjectTasks = async (projectId) => {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid project ID");
    }

    return await Task.find({ projectId }).populate("assignedTo", "name email");
};

// Get Tasks Assigned to a User
const getUserTasks = async (userId) => {
    return await Task.find({ assignedTo: userId });
};

// Update Task (Assigned User or Manager)
const updateTask = async (taskId, userId, userRole, updateData) => {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");

    // Allow only assigned user or manager to update
    if (task.assignedTo?.toString() !== userId && userRole !== "manager") {
        throw new Error("Access denied");
    }

    Object.assign(task, updateData);
    return await task.save();
};

// Delete Task (Manager Only)
const deleteTask = async (taskId) => {
    return await Task.findByIdAndDelete(taskId);
};

export default {
    createTask,
    getProjectTasks,
    getUserTasks,
    updateTask,
    deleteTask,
};
