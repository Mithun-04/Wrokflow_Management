import express from "express";
import { createTask, getProjectTasks, getUserTasks, updateTask, deleteTask } from "../controller/taskController.js";
import { authMiddleware, managerMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, managerMiddleware, createTask);
router.get("/project/:projectId", authMiddleware, getProjectTasks);
router.get("/user", authMiddleware, getUserTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, managerMiddleware, deleteTask);

export default router;
