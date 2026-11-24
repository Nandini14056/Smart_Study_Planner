function getDaysRemaining(deadline, today) {
  deadline = new Date(deadline).getTime();
  today = new Date(today).getTime();

  const timestamp = deadline - today;

  const days = timestamp / (1000 * 60 * 60 * 24);

  return days;
}

function calculateUrgency(deadline, today) {
  if (deadline === null) return 1;

  const remainingDays = getDaysRemaining(deadline, today);
  
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
  let score = calculateUrgency(task.deadline, today);

  if (task.important) score += 3;

  return score;
}

function sortTasks(tasks, today) {
  const pendingTasks = tasks.filter((task) => task.status === "pending");

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
  return pendingTasks;
}

export {
  getDaysRemaining,
  calculatePriority,
  calculateUrgency,
  sortTasks
}