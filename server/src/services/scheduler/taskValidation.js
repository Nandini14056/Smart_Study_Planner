function isValidDuration(duration) {
  return (
    typeof duration === "number" &&
    duration > 0 &&
    Number.isInteger(duration)
  );
}

function isValidTitle(title) {
  return typeof title === "string" && title.trim().length > 0;
}

function isValidDeadline(deadline) {
  if (deadline === null) {
    return true;
  }
  if (typeof deadline !== "string") {
    return false;
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(deadline)) {
    return false;
  }

  const date = new Date(deadline);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  return date.toISOString().slice(0, 10) === deadline;
}

function isValidTask(task) {
  return (
    task !== null &&
    typeof task === "object" &&
    !Array.isArray(task) &&
    isValidTitle(task.title) &&
    isValidDuration(task.estimatedMinutes) &&
    isValidDeadline(task.deadline)
  );
}


export {
  isValidDuration,
  isValidTitle,
  isValidTask,
  isValidDeadline,
}