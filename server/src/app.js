import express from "express";
import scheduleRoutes from "./routes/scheduleRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/schedule", scheduleRoutes);

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

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});