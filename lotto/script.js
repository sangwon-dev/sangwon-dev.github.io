const slot1 = document.querySelector('#slot1');
const slot2 = document.querySelector('#slot2');
const slot3 = document.querySelector('#slot3');
const slot4 = document.querySelector('#slot4');
const slot5 = document.querySelector('#slot5');
const slot6 = document.querySelector('#slot6');
const drawBtn = document.querySelector('#draw-btn');

const numbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45,
];
const shuffledNumbers = shuffle(numbers);

let counter = 0;

function shuffle(arr) {
  let newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function draw() {
  const randomNumber1 =
    shuffledNumbers[Math.floor(Math.random() * shuffledNumbers.length)];
  const randomNumber2 =
    shuffledNumbers[Math.floor(Math.random() * shuffledNumbers.length)];
  const randomNumber3 =
    shuffledNumbers[Math.floor(Math.random() * shuffledNumbers.length)];
  const randomNumber4 =
    shuffledNumbers[Math.floor(Math.random() * shuffledNumbers.length)];
  const randomNumber5 =
    shuffledNumbers[Math.floor(Math.random() * shuffledNumbers.length)];
  const randomNumber6 =
    shuffledNumbers[Math.floor(Math.random() * shuffledNumbers.length)];

  slot1.classList.add('slot-1');
  slot2.classList.add('slot-2');
  slot3.classList.add('slot-3');
  slot4.classList.add('slot-4');
  slot5.classList.add('slot-5');
  slot6.classList.add('slot-6');

  setTimeout(() => {
    slot1.classList.remove('slot-1');
    slot2.classList.remove('slot-2');
    slot3.classList.remove('slot-3');
    slot4.classList.remove('slot-4');
    slot5.classList.remove('slot-5');
    slot6.classList.remove('slot-6');

    setTimeout(() => {
      slot1.querySelector('.number').textContent = randomNumber1;
      slot2.querySelector('.number').textContent = randomNumber2;
      slot3.querySelector('.number').textContent = randomNumber3;
      slot4.querySelector('.number').textContent = randomNumber4;
      slot5.querySelector('.number').textContent = randomNumber5;
      slot6.querySelector('.number').textContent = randomNumber6;

      counter = 0;
    }, 0);
  }, 1000);
}

drawBtn.addEventListener('click', () => {
  draw();
});
