
import { generateSchedule } from "../src/services/scheduler/scheduler.js";

const tasks = [
  {
    id: 1,
    title: "Build portfolio",
    estimatedMinutes: 180,
    deadline: "2026-11-22",
    important: true,
    status: "pending"
  },
  {
    id: 2,
    title: "Practice JavaScript",
    estimatedMinutes: 60,
    deadline: "2026-11-25",
    important: false,
    status: "pending"
  },
  {
    id: 3,
    title: "Read a book",
    estimatedMinutes: 90,
    deadline: null,
    important: false,
    status: "pending"
  }
];

const availability = [
  { start: "09:00", end: "11:00" },
  { start: "14:00", end: "15:00" },
  { start: "19:00", end: "20:00" }
];

const result = generateSchedule(
  tasks,
  availability,
  "2026-11-21"
);

console.log("Generated Schedule:");
console.table(result.schedule);

console.log("Unscheduled Tasks:");
console.table(result.unscheduledTasks);
