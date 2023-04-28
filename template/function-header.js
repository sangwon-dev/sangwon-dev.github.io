function toggleShowMore() {
  const moreItems = document.getElementById('more-items');
  moreItems.style.display =
    moreItems.style.display === 'block' ? 'none' : 'block';
}
/* 기존 스크립트는 그대로 유지하고, 아래 코드를 추가하세요. */
(function swipeNavigation() {
  let startX;
  let endX;
  let isMouseDown = false;
  const threshold = 100;
  const navbar = document.getElementById('navbar');
  const scrollSpeed = 2;

  function handleSwipe() {
    const deltaX = startX - endX;
    if (Math.abs(deltaX) >= threshold) {
      navbar.scrollBy(deltaX * scrollSpeed, 0);
    }
  }

  // Touch events for mobile devices
  navbar.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  navbar.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });

  navbar.addEventListener('touchend', handleSwipe);

  // Mouse events for desktop browsers
  navbar.addEventListener('mousedown', (e) => {
    e.preventDefault();
    startX = e.clientX;
    isMouseDown = true;
  });

  navbar.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
      endX = e.clientX;
      handleSwipe();
    }
  });

  navbar.addEventListener('mouseup', () => {
    if (isMouseDown) {
      isMouseDown = false;
    }
  });

  navbar.addEventListener('mouseleave', () => {
    isMouseDown = false;
  });
})();
