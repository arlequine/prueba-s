import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: String,
  status: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Task = mongoose.models.Task || mongoose.model("tasks", TaskSchema);

export default Task;