'use strict'

function main () {

  var generalMainContainer = document.querySelector('#site-main');

//----- SPLASH -----//

//1. Create Splash variables //
  var stage;
  var game;
  var splashMainContainer;

//2. Create buildSplash function----------------------// 
  function buildSplash () {
    stage = 'splash';

    //2.1. Create DOM elements//
    splashMainContainer = document.createElement('div');
    splashMainContainer.setAttribute('id', 'splash');

    var splashTitle = document.createElement('h1');
    splashTitle.setAttribute('class', 'splash.title');
    splashTitle.innerText = 'Memory Game';

    var startButton = document.createElement('button');
    startButton.setAttribute('class', 'start-btn');
    startButton.innerText ='Start Game!!';
    
    //2.2. Append elements to Splash Main Container & SplashMC to Game Main Container //
    splashMainContainer.appendChild(splashTitle);
    splashMainContainer.appendChild(startButton);

    generalMainContainer.appendChild(splashMainContainer)

    //2.3. Bind click to Start Button//
    
  }
//3. Create destroySplash function//
//     1.2.1. Unbind click from start button//
//     1.2.2. Remove DOM elements 

buildSplash();
}

window.onload = main();