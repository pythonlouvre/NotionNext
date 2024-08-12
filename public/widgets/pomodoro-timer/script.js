// script.js
let startTime;
let elapsedSeconds = 25 * 60; // 初始化为 25 分钟
let intervalId;

const timerDisplay = document.getElementById('timer-display');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const alarmSound = document.getElementById('alarm-sound');

function updateTimerDisplay() {
  minutesElement.textContent = `${Math.floor(elapsedSeconds / 60)}`.padStart(2, '0');
  secondsElement.textContent = `${elapsedSeconds % 60}`.padStart(2, '0');
}

function startTimer() {
  startTime = performance.now();

  function tick() {
    const now = performance.now();
    const elapsed = Math.round((now - startTime) / 1000);
    const remaining = elapsedSeconds - elapsed;

    if (remaining > 0) {
      elapsedSeconds = remaining;
      updateTimerDisplay();

      intervalId = setTimeout(tick, 1000);
    } else {
      stopTimer();
      playAlarm();
    }
  }

  tick();
}

function playAlarm() {
  alarmSound.play().catch(error => {
    console.error('Failed to play alarm:', error);
  });
}

function stopTimer() {
  clearTimeout(intervalId);
  intervalId = null;
}

function resetTimer() {
  stopTimer();
  elapsedSeconds = 25 * 60; // 重置为 25 分钟
  updateTimerDisplay();
}

document.addEventListener('DOMContentLoaded', function () {
  startButton.addEventListener('click', startTimer);
  pauseButton.addEventListener('click', stopTimer);
  resetButton.addEventListener('click', resetTimer);

  updateTimerDisplay(); // 确保在页面加载时显示正确的初始时间
});