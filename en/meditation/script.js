const videoContainer = document.getElementById('video-container');
const meditationVideo = document.getElementById('meditation-video');
const meditationAudio = document.getElementById('meditation-audio');
const stopAudioButton = document.getElementById('stop-audio');
const goBackButton = document.getElementById('go-back');
const volumeSlider = document.getElementById('volume-slider');
const timer = document.getElementById('timer');
const howToMeditateButton = document.getElementById('how-to-meditate');
const meditationGuide = document.getElementById('meditation-guide');

let timerInterval;
let timeLeft;
// 동영상과 오디오 파일 URL 배열
const videoSources = [
  '../../public/videos/nature.mp4',
  '../../public/videos/nature1.mp4',
  '../../public/videos/nature2.mp4',
];
const audioSources = [
  '../../public/music/meditation.mp3',
  '../../public/music/meditation1.mp3',
  '../../public/music/meditation2.mp3',
  '../../public/music/meditation3.mp3',
];

function startMeditation(minutes) {
  videoContainer.style.display = 'block';
  const randomVideoIndex = Math.floor(Math.random() * videoSources.length);
  const randomAudioIndex = Math.floor(Math.random() * audioSources.length);

  meditationVideo.src = videoSources[randomVideoIndex];
  meditationAudio.src = audioSources[randomAudioIndex];

  timeLeft = minutes * 60;
  updateTimer(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      videoContainer.style.display = 'none';
      meditationVideo.pause();
      meditationVideo.currentTime = 0;
      meditationAudio.pause();
      meditationAudio.currentTime = 0;
      stopAudioButton.firstElementChild.textContent = 'pause';
      meditationAudio.autoplay = true;
    }
  }, 1000);
}

function updateTimer(timeLeft) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

stopAudioButton.addEventListener('click', () => {
  const playIcon = 'play_arrow';
  const pauseIcon = 'pause';

  if (meditationAudio.paused) {
    meditationAudio.play();
    meditationVideo.play();
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimer(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        videoContainer.style.display = 'none';
        meditationVideo.pause();
        meditationVideo.currentTime = 0;
        meditationAudio.pause();
        meditationAudio.currentTime = 0;
        stopAudioButton.firstElementChild.textContent = 'pause';
        meditationAudio.autoplay = true;
      }
    }, 1000);
    stopAudioButton.firstElementChild.textContent = pauseIcon;
  } else {
    clearInterval(timerInterval);
    meditationAudio.pause();
    meditationVideo.pause();
    stopAudioButton.firstElementChild.textContent = playIcon;
  }
});

goBackButton.addEventListener('click', () => {
  videoContainer.style.display = 'none';

  // 비디오와 오디오를 모두 멈춤
  meditationVideo.pause();
  meditationVideo.currentTime = 0;
  meditationAudio.pause();
  meditationAudio.currentTime = 0;

  // 재생 버튼 아이콘으로 변경
  stopAudioButton.firstElementChild.textContent = 'pause';

  // 다음 명상 시작 시 음악이 자동 재생되도록 설정
  meditationAudio.autoplay = true;
  clearInterval(timerInterval);
});

// 기타 코드 ...

volumeSlider.addEventListener('input', () => {
  const volume = volumeSlider.value / 100;
  meditationAudio.volume = volume;
});

howToMeditateButton.addEventListener('click', function (event) {
  event.preventDefault();
  meditationGuide.scrollIntoView({ behavior: 'smooth' });
});
