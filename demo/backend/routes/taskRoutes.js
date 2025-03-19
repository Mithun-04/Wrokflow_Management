import express from "express";
import { createTask, getProjectTasks, getUserTasks,  deleteTask, updateTaskStatus } from "../controller/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", authMiddleware,  createTask);
router.get("/:projectId", authMiddleware, getProjectTasks);
router.get("/user", authMiddleware, getUserTasks);
router.put("/:id", authMiddleware, updateTaskStatus);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
