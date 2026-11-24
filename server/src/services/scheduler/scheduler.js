import { calculateDuration, timeToMinutes, minutesToTime } from "./timeUtils.js";
import { validateAvailability } from "./validation.js";
import { sortTasks } from "./priority.js";
import { isValidTask } from "./taskValidation.js";

function calculateSessionDuration(remainingMinutes, slot, maxSessionMinutes = 60) {
  const duration = calculateDuration(slot.start, slot.end);
  return Math.min(duration, remainingMinutes, maxSessionMinutes);
}

function calculateAllowedSessionDuration(
  remainingMinutes,
  slot,
  continuousMinutes,
  maxSessionMinutes = 60
) {
  const allowedMinutes = maxSessionMinutes - continuousMinutes;

  const sessionDuration = calculateSessionDuration(remainingMinutes, slot, maxSessionMinutes);

  return Math.max(0, Math.min(allowedMinutes, sessionDuration));
}

function createSession(task, slot, remainingMinutes, continuousMinutes = 0) {
  const sessionDuration = calculateAllowedSessionDuration(remainingMinutes, slot, continuousMinutes);

  const start = timeToMinutes(slot.start);

  let end = start + sessionDuration;

  end = minutesToTime(end);

  return {
    taskId: task.id,
    title: task.title,
    start: slot.start,
    end: end,
    durationMinutes: sessionDuration,
  };
}

function hasNaturalBreak(
  previousEnd,
  currentStart,
  breakMinutes = 10
) {
  const gap = calculateDuration(previousEnd, currentStart);

  return gap >= breakMinutes;
}

function calculateContinuousStudyTime(schedule, currentStart) {
  let total = 0;
  let nextStart = currentStart;

  for (let i = schedule.length - 1; i >= 0; i--) {
    if (schedule[i].type === "break") {
      break;
    } else if (hasNaturalBreak(schedule[i].end, nextStart)) {
      break;
    }
    total += schedule[i].durationMinutes;
    nextStart = schedule[i].start;
  }
  return total;
}

function shouldTakeBreak(continuousMinutes, maxSessionMinutes = 60) {
  return continuousMinutes >= maxSessionMinutes;
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

function sortSchedule(schedule) {
  const scheduleCopy = [...schedule];

  scheduleCopy.sort((a, b) => {
    return timeToMinutes(a.start) - timeToMinutes(b.start)
  });

  return scheduleCopy;
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

  const sortedTasks = sortTasks(tasks, today);

  const copiedSlots = availability.map((slot) => ({ ...slot }));

  copiedSlots.sort((a, b) => {
    return timeToMinutes(a.start) - timeToMinutes(b.start);
  });

  const schedule = [];

  const unscheduledTasks = [];

  for (const task of sortedTasks) {
    let remainingMinutes = task.estimatedMinutes;

    for (const slot of copiedSlots) {
      if (remainingMinutes === 0) {
        break;
      }

      while (
        remainingMinutes > 0 &&
        calculateDuration(slot.start, slot.end) > 0
      ) {
        const continuousMinutes = calculateContinuousStudyTime(schedule, slot.start);

        if (shouldTakeBreak(continuousMinutes)) {
          if (calculateDuration(slot.start, slot.end) >= 10) {
            const breakSession = createBreakSession(slot.start, 10);
            schedule.push(breakSession);
            slot.start = breakSession.end;
            continue;
          } else {
            slot.start = slot.end;
            break;
          }
        }

        const session = createSession(task, slot, remainingMinutes, continuousMinutes);

        if (!Number.isFinite(session.durationMinutes) ||
          session.durationMinutes <= 0) {
          slot.start = slot.end;
          break;
        }

        schedule.push(session);

        remainingMinutes -= session.durationMinutes;
        slot.start = session.end;
      }
    }

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
    schedule: sortSchedule(schedule),
    unscheduledTasks,
  };
}

export {
  calculateSessionDuration,
  calculateAllowedSessionDuration,
  createSession,
  hasNaturalBreak,
  calculateContinuousStudyTime,
  shouldTakeBreak,
  sortSchedule,
  generateSchedule,
}