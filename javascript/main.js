'use strict'

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

    //2.1. Create DOM elements//
    splashMainContainer = document.createElement('div');
    splashMainContainer.setAttribute('id', 'splash');

    var splashTitle = document.createElement('h1');
    splashTitle.setAttribute('class', 'splash-title');
    splashTitle.innerText = 'Splash screen';

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
    game = new Game(generalMainContainer, catalog);
    

    window.setTimeout( function() {
      destroyGame();
      buildGameOver();
    }, 50000);

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

    //2.1. Create DOM elements//
    gameOverMainContainer = document.createElement('div');
    gameOverMainContainer.setAttribute('id', 'game-over');

    var gameOverTitle = document.createElement('h1');
    gameOverTitle.setAttribute('class', 'game-over-title');
    gameOverTitle.innerText = 'Game Over';

    playAgainButton = document.createElement('button');
    playAgainButton.setAttribute('class', 'play-again-btn');
    playAgainButton.innerText ='Play Again!!';
    
    //2.2. Append elements to GO Main Container & GOMC to Game Main Container //
    gameOverMainContainer.appendChild(gameOverTitle);
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