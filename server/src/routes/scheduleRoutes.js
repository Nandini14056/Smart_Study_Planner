import express from 'express';
import { generateSchedule } from '../services/scheduler/scheduler.js';
import Task from "../models/Task.js";
import Schedule from '../models/Schedule.js';
import { isValidDeadline } from '../services/scheduler/taskValidation.js';
import { validateAvailability } from '../services/scheduler/validation.js';

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { availability, today } = req.body;

    if (today === null || !isValidDeadline(today)) {
      return res.status(400).json({
        "success": false,
        "message": "Invalid date. Use YYYY-MM-DD format."
      })
    }

    if (!validateAvailability(availability)) {
      return res.status(400).json({
        "success": false,
        "message": "Invalid availability slots"
      })
    }

    const tasks = await Task.find({
      status: "pending"
    }).lean();

    const formattedTasks = tasks.map(task => ({
      ...task,
      id: task._id.toString()
    }));

    const schedule = generateSchedule(formattedTasks, availability, today);

    const savedSchedule = await Schedule.create({
      date: today,
      availability: availability,
      schedule: schedule.schedule,
      unscheduledTasks: schedule.unscheduledTasks
    });

    res.status(201).json({
      success: true,
      message: "Schedule generated and saved successfully",
      data: savedSchedule
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate schedule"
    });
  }
})

router.post('/', (req, res) => {
  try {
    const { tasks, availability, today } = req.body;

    const schedule = generateSchedule(tasks, availability, today);

    res.json({
      "success": true,
      "message": "Schedule request received",
      "data": schedule
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const savedSchedule = await Schedule.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All Schedules retrieved successfully",
      data: savedSchedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;