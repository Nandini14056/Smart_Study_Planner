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
  }
];

const availability = [
  { start: "09:00", end: "11:00" },
  { start: "14:00", end: "16:00" }
];

const today = "2026-11-22";

const result = generateSchedule(tasks, availability, today);

console.log(JSON.stringify(result, null, 2));
