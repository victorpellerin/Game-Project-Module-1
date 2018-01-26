'use strict'

var SCORE;

function main () {

  var generalMainContainer = document.querySelector('#site-main');
  var stage;
  var game;



  //----- SPLASH -----//

  //1. Create Splash variables //
  var splashMainContainer;
  var startButton;
  var startButtonBehaviour = function (){
    destroySplash();
    buildGame();
  }

  //2. Create buildSplash function----------------------// 
  function buildSplash () {
    stage = 'splash';
    SCORE = 0;

    //2.1. Create DOM elements//
    splashMainContainer = document.createElement('div');
    splashMainContainer.setAttribute('id', 'splash');

    var splashTitle = document.createElement('h1');
    splashTitle.setAttribute('class', 'splash-title');
    splashTitle.innerText = 'Space Memory Game';

    startButton = document.createElement('button');
    startButton.setAttribute('class', 'start-btn');
    startButton.innerText ='Start Game!!';
    
    //2.2. Append elements to Splash Main Container & SplashMC to Game Main Container //
    splashMainContainer.appendChild(splashTitle);
    splashMainContainer.appendChild(startButton);

    generalMainContainer.appendChild(splashMainContainer);

    //2.3. Bind click to Start Button//
    startButton.addEventListener('click', startButtonBehaviour);
  }

  //3. Create destroySplash function//
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
    // window.setTimeout( function() {
    //   destroyGame();
    //   buildGameOver();
    // }, 5000);

  }


  function destroyGame() {
    game.destroy();
  }



  //----- GAME OVER -----//

  //1. Create Game Over variables //
  var gameOverMainContainer;
  var playAgainButton;
  var playAgainButtonBehaviour = function (){
    destroyGameOver();
    buildSplash();
  }


  function buildGameOver () {
    stage = 'gameOver';

    if (isNaN(SCORE)){SCORE = 0};

    //2.1. Create DOM elements//
    gameOverMainContainer = document.createElement('div');
    gameOverMainContainer.setAttribute('id', 'game-over');

    var gameOverTitle = document.createElement('h1');
    gameOverTitle.setAttribute('class', 'game-over-title');
    gameOverTitle.innerText = 'Game Over';
    gameOverMainContainer.appendChild(gameOverTitle);

    var yourScore = document.createElement('div');
    yourScore.setAttribute('class', 'your-score');
    yourScore.innerText = 'your score: ' + SCORE;
    gameOverMainContainer.appendChild(yourScore);


    playAgainButton = document.createElement('button');
    playAgainButton.setAttribute('class', 'play-again-btn');
    playAgainButton.innerText ='Play Again!!';
    gameOverMainContainer.appendChild(playAgainButton);

    generalMainContainer.appendChild(gameOverMainContainer);

    //2.3. Bind click to Play Again Button//
    playAgainButton.addEventListener('click', playAgainButtonBehaviour);
  }

  //3. Create destroyGameOver function//
  function destroyGameOver (){
    playAgainButton.removeEventListener('click', playAgainButtonBehaviour);
    gameOverMainContainer.remove();
  } 
  
  buildSplash();



}

window.onload = main();