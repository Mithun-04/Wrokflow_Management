import express from "express";
import { signup, login, getProfile } from "../controller/authController.js";
import getUserName from "../controller/userController.js"

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", getUserName);


export default router;
