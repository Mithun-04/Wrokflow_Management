import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    projectId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Project", 
      required: true 
    },
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
    status: { 
      type: String, 
      enum: ["todo", "on-progress", "done"], 
      default: "todo" 
    },
    priority: { 
      type: String, 
      enum: ["low", "medium", "high"], 
      default: "medium" 
    },
    dueDate: { type: Date },
  },
  { 
    timestamps: true // Automatically adds createdAt & updatedAt
  }
);

// Export the Task model properly for ES Modules
const Task = mongoose.model("Task", taskSchema);
export default Task;
