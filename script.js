let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const lapsList = document.getElementById("laps");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(ms % 1000).slice(0, 2).padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime;
  display.textContent = formatTime(elapsedTime);
}

document.getElementById("startBtn").addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 50);
    isRunning = true;
  }
});

document.getElementById("pauseBtn").addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  display.textContent = "00:00:00";
  lapsList.innerHTML = "";
});

document.getElementById("lapBtn").addEventListener("click", () => {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap: ${lapTime}`;
    lapsList.appendChild(lapItem);
  }
});
