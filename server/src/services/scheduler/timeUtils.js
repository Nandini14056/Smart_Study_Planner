function timeToMinutes(time) {
  // Step 1: Split "09:30" into hours and minutes
  // Step 2: Convert both values into numbers
  let hrs = Number(time.slice(0, 2));
  let mins = Number(time.slice(3, 5));

  // Step 3: Calculate total minutes
  const totalMins = hrs * 60 + mins;
  // Step 4: Return the result
  return totalMins;
}

function minutesToTime(t) {
  let hrs = Math.floor(t / 60);
  let mins = t % 60;

  hrs = hrs.toString().padStart(2, "0");
  mins = mins.toString().padStart(2, "0");

  return hrs + ":" + mins;
}

function calculateDuration(start, end) {
  // Use timeToMinutes()
  start = timeToMinutes(start);
  end = timeToMinutes(end);

  const duration = end - start;
  // Return the duration in minutes
  return duration;
}

export {
  minutesToTime,
  timeToMinutes,
  calculateDuration
}