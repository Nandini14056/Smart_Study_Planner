function getDaysRemaining(deadline, today) {
  // Step 1: Convert both dates into timestamps
  deadline = new Date(deadline).getTime();
  today = new Date(today).getTime();

  // Step 2: Subtract today's timestamp
  // from the deadline timestamp
  const timestamp = deadline - today;

  // Step 3: Convert milliseconds into days
  const days = timestamp / (1000 * 60 * 60 * 24);

  // Step 4: Return the number of days
  return days;
}

function calculateUrgency(deadline, today) {
  // Step 1: If deadline is null, return 1
  if (deadline === null) return 1;

  // Step 2: Calculate days remaining
  // using getDaysRemaining()
  const remainingDays = getDaysRemaining(deadline, today);
  // Step 3: Apply urgency rules
  // Step 4: Return urgency score
  if (remainingDays < 0) {
    return 10;
  } else if (remainingDays <= 1) {
    return 9;
  } else if (remainingDays <= 3) {
    return 7;
  } else if (remainingDays <= 7) {
    return 5;
  } else {
    return 2;
  }
}

function calculatePriority(task, today) {
  // Step 1: Calculate urgency score
  let score = calculateUrgency(task.deadline, today);
  // Step 2: If task.important is true,
  // add 3 points
  if (task.important) score += 3;
  // Step 3: Return total priority score

  return score;
}

function sortTasks(tasks, today) {
  // Step 1: Keep only pending tasks
  const pendingTasks = tasks.filter((task) => task.status === "pending");

  // Step 2: Sort tasks by calculated priority
  // Hint: Use .sort()
  pendingTasks.sort((a, b) => {
    const priorityA = calculatePriority(a, today);
    const priorityB = calculatePriority(b, today);

    if (priorityA !== priorityB) {
      return priorityB - priorityA;
    }

    if (a.deadline === null && b.deadline === null) {
      return 0;
    }

    if (a.deadline === null) return 1;
    if (b.deadline === null) return -1;

    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });
  // Step 3: Return the sorted tasks
  return pendingTasks;
}

export {
  getDaysRemaining,
  calculatePriority,
  calculateUrgency,
  sortTasks
}