import taskService from "../service/taskService.js"; 

// ✅ Create Task (Manager Only)
export const createTask = async (req, res) => {
    try {
        console.log("📌 Creating task for:", req.body.assignedTo);

        const task = await taskService.createTask({ 
            title: req.body.title,
            description: req.body.description,
            projectId: req.body.projectId,
            assignedTo: req.body.assignedTo,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            createdBy: req.user.id, 
        });

        res.status(201).json(task);
    } catch (error) {
        console.error("❌ Error creating task:", error.message);
        res.status(400).json({ error: error.message });
    }
};

// ✅ Get All Tasks for a Project (Filtered by Project ID & User)
export const getProjectTasks = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const userId = req.user.id; 

        console.log(`📌 Fetching tasks for Project: ${projectId}, User: ${userId}`);

        const tasks = await taskService.getProjectTasks(projectId, userId);
        res.json({
            success: true,
            data: tasks,
            message: 'Tasks retrieved successfully'
        });
    } catch (error) {
        console.error("❌ Error fetching project tasks:", error.message);
        res.status(400).json({ 
            success: false,
            error: error.message 
        });
    }
};

// ✅ Get All Tasks Assigned to a User (Passed from Frontend)
export const getUserTasks = async (req, res) => {
    try {
        const userId = req.query.userId || req.user.id; // ✅ Allow frontend to pass userId
        console.log(`📌 Fetching tasks for User ID: ${userId}`);

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const tasks = await taskService.getUserTasks(userId);
        res.json(tasks);
    } catch (error) {
        console.error("❌ Error fetching user tasks:", error.message);
        res.status(400).json({ error: error.message });
    }
};

// ✅ Update Task (Assigned User or Manager)
export const updateTask = async (req, res) => {
    try {
        console.log(`📌 Updating Task ID: ${req.params.id} by User ID: ${req.user.id}`);

        const task = await taskService.updateTask( 
            req.params.id,
            req.user.id,
            req.user.role,
            req.body
        );

        res.json(task);
    } catch (error) {
        console.error("❌ Error updating task:", error.message);
        res.status(400).json({ error: error.message });
    }
};

// ✅ Delete Task (Manager Only)
export const deleteTask = async (req, res) => {
    try {
        console.log(`📌 Deleting Task ID: ${req.params.id}`);

        await taskService.deleteTask(req.params.id); 
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting task:", error.message);
        res.status(400).json({ error: error.message });
    }
};
