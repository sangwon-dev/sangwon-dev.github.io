const teamColors = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'cyan',
  'magenta',
  'lime',
  'pink',
  'teal',
];

function lottery() {
  const teamNumber = document.getElementById('teamNumber').value;
  const ballContainer = document.getElementById('ballContainer');

  // 이전에 생성된 볼들을 모두 삭제합니다.
  while (ballContainer.firstChild) {
    ballContainer.firstChild.remove();
  }

  const chosenTeam = Math.floor(Math.random() * teamNumber);

  for (let i = 0; i < 1000; i++) {
    const ball = document.createElement('div');
    ball.className = 'ball';

    // 마지막 볼에만 텍스트를 추가합니다.
    if (i === 999) {
      ball.innerText = `Team ${chosenTeam + 1}`;
      ball.style.backgroundColor = teamColors[chosenTeam];
    } else {
      ball.style.backgroundColor = teamColors[i % teamNumber];
    }

    ballContainer.appendChild(ball);
    const finalPosX = (0.5 - Math.random()) * 100;
    const finalPosY = (0.5 - Math.random()) * 100;

    ball.animate(
      [
        { transform: 'translate3d(0, 0, 0) scale(1)' },
        {
          transform: `translate3d(${finalPosX}vw, ${finalPosY}vh, 400px) scale(0)`,
        },
      ],
      {
        duration: 2000,
        fill: 'forwards',
      }
    );

    if (i === 999) {
      setTimeout(() => {
        ball.animate(
          [
            {
              transform: `translate3d(${finalPosX}vw, ${finalPosY}vh, 400px) scale(0)`,
            },
            { transform: 'translate3d(0, 0, 0) scale(1)' },
          ],
          {
            duration: 2000,
            fill: 'forwards',
          }
        );
      }, 2000);
    }
  }
}
