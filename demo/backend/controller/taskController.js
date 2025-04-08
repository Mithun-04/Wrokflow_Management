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
            createdBy: req.user.id,
        });
        res.status(201).json({ success: true, data: task, message: "Task created successfully" });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(400).json({ success: false, error: error.message });
    }
};

export const getProjectTasks = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const userId = req.user.id;

        const tasks = await taskService.getProjectTasks(projectId, userId);
        res.json({
            success: true,
            data: tasks,
            message: 'Tasks retrieved successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get All Tasks Assigned to Logged-in User
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

//  Update Task (Assigned User or Manager)
export const updateTaskStatus = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user.id; 
        const { status } = req.body;

        console.log("taskId",taskId);

        if (!status) {
            return res.status(400).json({ success: false, error: "Status is required" });
        }

        const updatedTask = await taskService.updateTask(taskId, userId, { status });

        res.json({
            success: true,
            data: updatedTask,
            message: "Task status updated successfully"
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete Task (Only Managers Can Delete)
export const deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(400).json({ success: false, error: error.message });
    }
};