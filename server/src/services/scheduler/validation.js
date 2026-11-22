import { timeToMinutes } from "./timeUtils.js";

function isValidSlot(slot) {

  if (
    typeof slot !== "object" ||
    Array.isArray(slot)
  ) {
    return false;
  }

  if (!isValidTime(slot.start) ||
    !isValidTime(slot.end)) {
    return false
  }
  // Step 1: Convert start time to minutes
  // Step 2: Convert end time to minutes
  const startMin = timeToMinutes(slot.start);
  const endMin = timeToMinutes(slot.end);

  // Step 3: Return true if start < end
  // Otherwise return false
  return startMin < endMin;
}

function hasOverlap(slotA, slotB) {
  // Convert all four times into minutes
  const startA = timeToMinutes(slotA.start);
  const endA = timeToMinutes(slotA.end);

  const startB = timeToMinutes(slotB.start);
  const endB = timeToMinutes(slotB.end);
  // Apply the overlap condition
  // Return true or false

  return startA < endB && startB < endA;
}

function validateAvailability(availability) {
  if (!Array.isArray(availability)) {
    return false;
  }

  // Step 1: Check whether every slot is valid
  for (let i = 0; i < availability.length; i++) {
    if (!isValidSlot(availability[i])) {
      return false;
    }
  }
  // Step 2: Compare every pair of slots
  // Step 3: If any pair overlaps, return false
  for (let i = 0; i < availability.length; i++) {
    for (let j = i + 1; j < availability.length; j++) {
      if (hasOverlap(availability[i], availability[j])) {
        return false;
      }
    }
  }
  // Step 4: If all checks pass, return true
  return true;
}

function isValidTime(time) {
  if (typeof time !== "string") {
    return false;
  }

  const regex = /^\d{2}:\d{2}$/

  if (!regex.test(time)) {
    return false;
  }

  const parts = time.split(":");

  const hrs = Number(parts[0]);
  const mins = Number(parts[1]);

  return (
    hrs >= 0 &&
    hrs <= 23 &&
    mins >= 0 &&
    mins <= 59
  );
}

export {
  validateAvailability,
  hasOverlap,
  isValidSlot,
  isValidTime
};