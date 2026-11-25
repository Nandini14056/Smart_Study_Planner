import express from "express";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use(express.json());
dotenv.config();

await connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/schedule", scheduleRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Smart Study Planner");
});

app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "Smart Study Planner API is working",
    version: "1.0.0"
  });
});