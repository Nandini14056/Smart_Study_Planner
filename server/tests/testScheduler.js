import { generateSchedule } from "../src/services/scheduler/scheduler.js";
const tasks = [
  {
    id: 1,
    title: "Study JavaScript",
    estimatedMinutes: 90,
    deadline: "2026-11-25",
    important: true,
    status: "pending"
  },
  {
    id: 2,
    title: "Build Portfolio",
    estimatedMinutes: 120,
    deadline: "2026-11-28",
    important: false,
    status: "pending"
  },
  {
    id: 3,
    title: "Practice DSA",
    estimatedMinutes: 60,
    deadline: null,
    important: false,
    status: "pending"
  },
  {
    id: 4,
    title: "Complete Assignment",
    estimatedMinutes: 30,
    deadline: "2026-11-24",
    important: true,
    status: "completed"
  }
];

const availability = [
  { start: "14:00", end: "16:00" },
  { start: "09:00", end: "11:00" }
];

const today = "2026-11-24";

console.log(
  JSON.stringify(
    generateSchedule(tasks, availability, today),
    null,
    2
  )
);