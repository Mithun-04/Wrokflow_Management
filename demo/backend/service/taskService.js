import Task from "../models/Task.js";
import User from "../models/User.js";
import Project from "../models/Project.js"; // Import Project model
import mongoose from "mongoose";

// ✅ Create Task (Manager Only)
const createTask = async ({ title, description, projectId, assignedTo, priority, dueDate, createdBy }) => {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid project ID");
    }

    // Fetch the project to check if the user is the manager
    const project = await Project.findById(projectId);
    if (!project) {
        throw new Error("Project not found");
    }

    if (project.manager.toString() !== createdBy.toString()) {
        throw new Error("Unauthorized: Only the project manager can create tasks");
    }

    // Check if assigned user exists
    const user = await User.findById(assignedTo);
    if (!user) {
        throw new Error("Assigned user not found");
    }

    // Create and save the task
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


const getProjectTasks = async (projectId, userId) => {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid project ID");
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
    }

    return await Task.find({ projectId, assignedTo: userId })
        .populate("assignedTo", "name email");
};


const getUserTasks = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
    }

    return await Task.find({ assignedTo: userId });
};

// ✅ Update Task (Only Assigned User or Manager)
const updateTask = async (taskId, userId, userRole, updateData) => {
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        throw new Error("Invalid task ID");
    }

    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");

    // Allow only assigned user or manager to update
    if (task.assignedTo?.toString() !== userId && userRole !== "manager") {
        throw new Error("Access denied");
    }

    Object.assign(task, updateData);
    return await task.save();
};

// ✅ Delete Task (Manager Only)
const deleteTask = async (taskId, userId, userRole) => {
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        throw new Error("Invalid task ID");
    }

    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");

    // Only the manager can delete tasks
    if (userRole !== "manager") {
        throw new Error("Access denied: Only the manager can delete tasks");
    }

    return await Task.findByIdAndDelete(taskId);
};

// ✅ Export All Functions
export default {
    createTask,
    getProjectTasks,
    getUserTasks,
    updateTask,
    deleteTask,
};
