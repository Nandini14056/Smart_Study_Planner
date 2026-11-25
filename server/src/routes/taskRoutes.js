import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: error.message })
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({ message: "Task Not Found" })
    }

    const task = await Task.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    return res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message })
    }

    return res.status(500).json({ message: error.message })
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({ message: "Task Not Found" })
    }

    await Task.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });

  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: error.message })
    }

    return res.status(500).json({ message: error.message })
  }
})

export default router;