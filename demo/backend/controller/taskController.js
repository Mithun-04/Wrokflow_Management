import taskService from "../service/taskService.js";

// Create Task (Manager Only)
export const createTask = async (req, res) => {
    try {
        const task = await taskService.createTask({
            title: req.body.title,
            description: req.body.description,
            projectId: req.body.projectId,
            assignedTo: req.body.assignedTo,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            createdBy: req.user._id, // Ensure consistency in user ID format
        });
        res.status(201).json({ success: true, data: task, message: "Task created successfully" });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get All Tasks in a Specific Project (for authorized users)
// export const getProjectTasks = async (req, res) => {
//     try {
//         const projectId = req.params.projectId;
//         const userId = req.user.id;
        
//         const tasks = await taskService.getProjectTasks(projectId, userId);
//         res.status(200).json({
//             success: true,
//             data: tasks,
//             message: "Tasks retrieved successfully",
//         });
//     } catch (error) {
//         console.error("Error fetching project tasks:", error);
//         res.status(400).json({ success: false, error: error.message });
//     }
// };

// Get All Tasks Assigned to the Logged-in User
export const getUserTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await taskService.getUserTasks(userId);
        res.status(200).json({ success: true, data: tasks, message: "User tasks retrieved successfully" });
    } catch (error) {
        console.error("Error fetching user tasks:", error);
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update Task (Only Assigned User or Manager Can Update)
export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id; // Extract task ID from request params
        const userId = req.user._id; // Extract user ID
        const { status } = req.body; // Extract updated status from request body
        
        console.log("taskId:", taskId);
        
        // Ensure status is provided
        if (!status) {
            return res.status(400).json({ success: false, message: "Status is required" });
        }
        
        // Call the service function with required parameters
        const updatedTask = await taskService.updateTask(taskId, userId, { status });
        
        res.status(200).json({ success: true, data: updatedTask, message: "Task updated successfully" });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete Task (Only Managers Can Delete)
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const userRole = req.user.role;
        
        await taskService.deleteTask(id, userId, userRole);
        
        res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(400).json({ success: false, error: error.message });
    }
};