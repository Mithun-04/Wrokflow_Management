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
            createdBy: req.user.id, // Manager ID
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All Tasks in a Project
export const getProjectTasks = async (req, res) => {
    try {
        const tasks = await taskService.getProjectTasks(req.params.projectId); 
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All Tasks Assigned to Logged-in User
export const getUserTasks = async (req, res) => {
    try {
        const tasks = await taskService.getUserTasks(req.user.id);
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//  Update Task (Assigned User or Manager)
export const updateTask = async (req, res) => {
    try {
        const task = await taskService.updateTask( 
            req.params.id,
            req.user.id,
            req.user.role,
            req.body
        );
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Task (Manager Only)
export const deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.params.id); 
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
