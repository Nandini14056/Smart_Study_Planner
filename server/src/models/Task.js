import mongoose from "mongoose";
import {isValidDeadline} from "../services/scheduler/taskValidation.js";

const taskSchema = new mongoose.Schema(
  {
    title:{
      type: String,
      required: true,
      trim: true, 
    },
    estimatedMinutes: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isInteger
    },
    deadline:{
      type: String,
      default: null,
      validate: isValidDeadline
    },
    important: {
      type: Boolean,
      default: false
    },
    status:{
      type: String,
      default: "pending",
      enum: ["pending","completed"]
    },
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;