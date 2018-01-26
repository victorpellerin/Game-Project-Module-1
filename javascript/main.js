'use strict'

function main () {

  var generalMainContainer = document.querySelector('#site-main');
  var stage;
  var game;

  //----- SPLASH -----//
  var splashMainContainer;
  var startButton;
  var startButtonBehaviour = function (){
    destroySplash();
    buildGame();
  }

  function buildSplash () {
    stage = 'splash';

    splashMainContainer = document.createElement('div');
    splashMainContainer.setAttribute('id', 'splash');

    var splashTitle = document.createElement('h1');
    splashTitle.setAttribute('class', 'splash-title');
    splashTitle.innerText = 'Space Memory Game';

    startButton = document.createElement('button');
    startButton.setAttribute('class', 'start-btn');
    startButton.innerText ='Start Game!!';
    
    splashMainContainer.appendChild(splashTitle);
    splashMainContainer.appendChild(startButton);

    generalMainContainer.appendChild(splashMainContainer);

    startButton.addEventListener('click', startButtonBehaviour);
  }

  function destroySplash (){
    startButton.removeEventListener('click', startButtonBehaviour);
    splashMainContainer.remove();
  } 

  //----- GAME -----//
  var gameMainContainer;

  function buildGame() {
    stage = 'game';
    game = new Game(generalMainContainer, levels);
    
    game.onGameOver(function(){
      destroyGame();
      buildGameOver();
    })
  }

  function destroyGame() {
    game.destroy();
  }

  //----- GAME OVER -----//
  var gameOverMainContainer;
  var playAgainButton;
  var playAgainButtonBehaviour = function (){
    destroyGameOver();
    buildSplash();
  }

  function buildGameOver () {
    stage = 'gameOver';

    gameOverMainContainer = document.createElement('div');
    gameOverMainContainer.setAttribute('id', 'game-over');

    var gameOverTitle = document.createElement('h1');
    gameOverTitle.setAttribute('class', 'game-over-title');
    gameOverTitle.innerText = 'Game Over';
    gameOverMainContainer.appendChild(gameOverTitle);

    var yourScore = document.createElement('div');
    yourScore.setAttribute('class', 'your-score');
    yourScore.innerText = 'your score: ' + game.score;
    gameOverMainContainer.appendChild(yourScore);


    playAgainButton = document.createElement('button');
    playAgainButton.setAttribute('class', 'play-again-btn');
    playAgainButton.innerText ='Play Again!!';
    gameOverMainContainer.appendChild(playAgainButton);

    generalMainContainer.appendChild(gameOverMainContainer);

    //2.3. Bind click to Play Again Button//
    playAgainButton.addEventListener('click', playAgainButtonBehaviour);
  }

  function destroyGameOver (){
    playAgainButton.removeEventListener('click', playAgainButtonBehaviour);
    gameOverMainContainer.remove();
  } 
  
  buildSplash();

}

window.onload = main();