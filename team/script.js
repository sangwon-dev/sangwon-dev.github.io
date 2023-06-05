function showGame(gameNumber) {
  var gameContainers = document.getElementsByClassName('card-container');
  for (var i = 0; i < gameContainers.length; i++) {
    gameContainers[i].style.display = 'none';
  }
  document.getElementById('game-' + gameNumber).style.display = 'flex';
}

function selectOption(option) {
  option.classList.add('disabled');
}
