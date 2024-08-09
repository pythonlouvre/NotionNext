document.addEventListener('DOMContentLoaded', function () {
  let minutes = 25;
  let seconds = 0;
  let intervalId;

  const timerDisplay = document.getElementById('timer-display');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');
  const startButton = document.getElementById('start-button');
  const pauseButton = document.getElementById('pause-button');
  const resetButton = document.getElementById('reset-button');

  function updateTimerDisplay() {
    minutesElement.textContent = `${minutes}`.padStart(2, '0');
    secondsElement.textContent = `${seconds}`.padStart(2, '0');
  }

  function startTimer() {
    intervalId = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(intervalId);
          alert('时间到！');
          return;
        }
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      updateTimerDisplay();
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(intervalId);
  }

  function resetTimer() {
    clearInterval(intervalId);
    minutes = 25;
    seconds = 0;
    updateTimerDisplay();
  }

  startButton.addEventListener('click', startTimer);
  pauseButton.addEventListener('click', pauseTimer);
  resetButton.addEventListener('click', resetTimer);

  updateTimerDisplay();
});