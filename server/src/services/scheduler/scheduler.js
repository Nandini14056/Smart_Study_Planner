import { calculateDuration, timeToMinutes, minutesToTime } from "./timeUtils.js";
import { validateAvailability } from "./validation.js";
import { sortTasks } from "./priority.js";
import { isValidTask } from "./taskValidation.js";

function calculateSessionDuration(remainingMinutes, slot, maxSessionMinutes = 60) {
  // Step 1: Calculate the duration of the slot
  // Hint: You already have calculateDuration()
  const duration = calculateDuration(slot.start, slot.end);
  // Step 2: Compare remaining task duration
  // with available slot duration
  // Step 3: Return the smaller value
  return Math.min(duration, remainingMinutes, maxSessionMinutes);
}

function createSession(task, slot, remainingMinutes) {
  // Step 1: Calculate how many minutes
  // of the task can fit in the slot
  const sessionDuration = calculateSessionDuration(remainingMinutes, slot);

  // Step 2: Convert slot.start into minutes
  const start = timeToMinutes(slot.start);

  // Step 3: Calculate session end time
  // end = start + sessionDuration
  let end = start + sessionDuration;

  // Step 4: Convert end time back to HH:MM
  end = minutesToTime(end);

  // Step 5: Return a session object
  return {
    taskId: task.id,
    title: task.title,
    start: slot.start,
    end: end,
    durationMinutes: sessionDuration,
  };
}

function generateSchedule(tasks, availability, today) {
  if (!Array.isArray(tasks)) {
    throw new Error("Tasks must be an array");
  }

  if (!Array.isArray(availability)) {
    throw new Error("Availability must be an array");
  }

  if (!validateAvailability(availability)) {
    throw new Error("Invalid availability slots");
  }

  for (const task of tasks) {
    if (!isValidTask(task)) {
      throw new Error("Invalid task");
    }
  }

  // Step 2: Sort tasks by priority
  const sortedTasks = sortTasks(tasks, today);

  // Step 3: Copy availability
  const copiedSlots = availability.map((slot) => ({ ...slot }));

  // Step 4: Sort slots by starting time
  copiedSlots.sort((a, b) => {
    return timeToMinutes(a.start) - timeToMinutes(b.start);
  });

  // Step 5: Create empty schedule
  const schedule = [];

  const unscheduledTasks = [];

  // Step 6: Loop through sorted tasks
  for (const task of sortedTasks) {
    // Step 7: Store remaining task duration
    let remainingMinutes = task.estimatedMinutes;

    // Step 8: Loop through available slots
    for (const slot of copiedSlots) {
      // We'll add scheduling logic here next
      if (remainingMinutes === 0) {
        break;
      }

      while (
        remainingMinutes > 0 &&
        calculateDuration(slot.start, slot.end) > 0
      ) {
        const session = createSession(task, slot, remainingMinutes);

        schedule.push(session);

        remainingMinutes -= session.durationMinutes;

        slot.start = session.end;

        const breakDuration = calculateBreakDuration(session.durationMinutes);

        if (
          remainingMinutes > 0 &&
          breakDuration > 0 &&
          calculateDuration(slot.start, slot.end) >= breakDuration
        ) {
          const breakSession = createBreakSession(slot.start, breakDuration);
          schedule.push(breakSession);
          slot.start = breakSession.end;
        }
      }
    }

    // Step 9: If the task still has remaining time,
    // add it to unscheduledTasks
    if (remainingMinutes > 0) {
      unscheduledTasks.push({
        taskId: task.id,
        title: task.title,
        remainingMinutes: remainingMinutes,
      });
    }
  }

  return {
    sortedTasks,
    availableSlots: copiedSlots,
    schedule,
    unscheduledTasks,
  };
}


function calculateBreakDuration(sessionDuration, breakMinutes = 10, maxSessionMinutes = 60) {
  if (sessionDuration === maxSessionMinutes) {
    return breakMinutes;
  } else {
    return 0;
  }
}

function createBreakSession(startTime, breakDuration) {
  const startMins = timeToMinutes(startTime) + breakDuration;
  const endTime = minutesToTime(startMins);

  return ({
    "type": "break",
    "title": "Short Break",
    "start": startTime,
    "end": endTime,
    "durationMinutes": breakDuration
  });
}

export {
  calculateSessionDuration,
  createSession,
  generateSchedule,
}