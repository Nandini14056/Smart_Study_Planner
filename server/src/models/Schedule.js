import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true
    },
    availability: {
      type: Array,
      required: true
    },
    schedule: {
      type: Array,
      required: true
    },
    unscheduledTasks: {
      type: Array,
      default: []
    },
  },
  {
    timestamps: true
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema)

export default Schedule;