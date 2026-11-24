import express from 'express';
import { generateSchedule } from '../services/scheduler/scheduler.js';

const router = express.Router();

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

export default router;