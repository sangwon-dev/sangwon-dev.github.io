const menuList = [
  '불고기',
  '김치찌개',
  '된장찌개',
  '라면',
  '초밥',
  '돈까스',
  '제육볶음',
  '비빔밥',
  '떡볶이',
  '짜장면',
  '짬뽕',
  '볶음밥',
  '치킨',
  '피자',
  '파스타',
  '샌드위치',
  '쌀국수',
  '순두부찌개',
  '갈비',
  '탕수육',
];

const cardContainer = document.querySelector('.card-container');
const recommendButton = document.getElementById('recommend-button');

function createCard(menu) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');

  const cardFront = document.createElement('div');
  cardFront.classList.add('card-front');
  cardFront.textContent = '클릭해서 확인!';

  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');
  cardBack.textContent = menu;

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  // Add this event listener
  card.addEventListener('click', () => {
    card.classList.toggle('card-flipped');
  });

  return card;
}

/* ... The rest of the script remains the same ... */

function clearCards() {
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
}

function displayCards() {
  cardContainer.classList.add('fade-out');

  setTimeout(() => {
    clearCards();
    for (let i = 0; i < 3; i++) {
      const randomMenu = menuList[Math.floor(Math.random() * menuList.length)];
      const card = createCard(randomMenu);
      cardContainer.appendChild(card);
    }
    cardContainer.classList.remove('fade-out');
    cardContainer.classList.add('fade-in');
  }, 500);

  setTimeout(() => {
    cardContainer.classList.remove('fade-in');
  }, 1000);
}

recommendButton.addEventListener('click', displayCards);
