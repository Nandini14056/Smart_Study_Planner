function timeToMinutes(time) {
  let hrs = Number(time.slice(0, 2));
  let mins = Number(time.slice(3, 5));

  const totalMins = hrs * 60 + mins;
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
  start = timeToMinutes(start);
  end = timeToMinutes(end);

  const duration = end - start;
  return duration;
}

export {
  minutesToTime,
  timeToMinutes,
  calculateDuration
}