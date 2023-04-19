document.addEventListener('DOMContentLoaded', function () {
  const progressBar = document.createElement('div');
  progressBar.classList.add('scroll-progress-bar');
  const progressContainer = document.createElement('div');
  progressContainer.classList.add('scroll-progress-container');
  progressContainer.appendChild(progressBar);
  document.body.appendChild(progressContainer);

  window.addEventListener('scroll', function () {
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercent = (window.pageYOffset / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
});
