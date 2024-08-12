// script.js
let startTime;
let elapsedSeconds = 0;
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

function startTimer(minutes, seconds) {
  elapsedSeconds = minutes * 60 + seconds;
  startTime = performance.now();

  function tick() {
    const now = performance.now();
    const elapsed = Math.round((now - startTime) / 1000);
    const remaining = elapsedSeconds - elapsed;

    if (remaining > 0) {
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
  elapsedSeconds = 25 * 60;
  updateTimerDisplay();
}

document.addEventListener('DOMContentLoaded', function () {
  startButton.addEventListener('click', () => startTimer(25, 0));
  pauseButton.addEventListener('click', stopTimer);
  resetButton.addEventListener('click', resetTimer);

  updateTimerDisplay();
});