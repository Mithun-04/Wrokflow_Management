const mongoose = require("mongoose");

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
      enum: ["todo", "in-progress", "done"], 
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

module.exports = mongoose.model("Task", taskSchema);
