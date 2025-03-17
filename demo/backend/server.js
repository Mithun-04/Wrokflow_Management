import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import invitationRoutes from './routes/invitationRoutes.js'


config();
const app = express();
app.use(json());
app.use(cors());

connectDB();

app.use("/auth", authRoutes);
app.use("/api/projects" ,projectRoutes)
app.use("/api/invite" , invitationRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
