const timerDisplay = document.querySelector('.timer-display');
const minutesDisplay = document.querySelector('.minutes');
const secondsDisplay = document.querySelector('.seconds');
const startButton = document.querySelector('.start-button');
const pauseButton = document.querySelector('.pause-button');
const resumeButton = document.querySelector('.resume-button');
const sessionCount = document.querySelector('.session-count');
const resetButton = document.querySelector('.reset-button');

let isRunning = false;
let timer;
let count = 0;

startButton.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    startButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
    startTimer();
  }
});

pauseButton.addEventListener('click', () => {
  if (isRunning) {
    isRunning = false;
    pauseButton.style.display = 'none';
    resumeButton.style.display = 'inline-block';
    clearInterval(timer);
  }
});

resumeButton.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    pauseButton.style.display = 'inline-block';
    resumeButton.style.display = 'none';
    startTimer();
  }
});

function startTimer() {
  let minutes = parseInt(minutesDisplay.textContent);
  let seconds = parseInt(secondsDisplay.textContent);

  timer = setInterval(() => {
    seconds--;
    if (seconds < 0) {
      seconds = 59;
      minutes--;

      if (minutes < 0) {
        clearInterval(timer);
        isRunning = false;
        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
        resumeButton.style.display = 'none';

        // 포모도로 사이클이 끝난 경우 새로운 타이머 설정
        if (startButton.classList.contains('break')) {
          startButton.classList.remove('break');
          minutesDisplay.textContent = '25';
          secondsDisplay.textContent = '00';
        } else {
          startButton.classList.add('break');
          minutesDisplay.textContent = '5';
          secondsDisplay.textContent = '00';
          count++;
          sessionCount.textContent = `${count} 회`;
        }
      } else {
        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
      }
    } else {
      secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }
  }, 1000);
}

resetButton.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  startButton.style.display = 'inline-block';
  pauseButton.style.display = 'none';
  resumeButton.style.display = 'none';
  startButton.classList.remove('break');
  minutesDisplay.textContent = '25';
  secondsDisplay.textContent = '00';
});
