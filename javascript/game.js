'use strict';

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


function Game(parentContainer, levels) {
  var self = this;
  
  self.parentContainer = parentContainer;
  self.level = 0;
  self.levels = levels;

  self.handleClickImage = function (event) {

    var imgSrc = event.target.children[0].src;
    var imgParentElement = event.target;

    if (self.count === 0){
      self.imgOne = event.target.children[0];
      self.imgOne.setAttribute('class', 'image-shown');
      self.guess1[0] = imgSrc;
      self.guess1[1] = imgParentElement;
      self.count++;
      console.log('first image')
    } 
    else {
      if (self.guess1[0] === imgSrc && self.guess1[1] !== imgParentElement){ 
        self.imgTwo = event.target.children[0];
        self.imgTwo.setAttribute('class', 'image-shown');
        imgParentElement.setAttribute('class', 'hidden');
        self.guess1[1].setAttribute('class', 'hidden');
        imgParentElement.removeEventListener('click', self.handleClickImage);
        self.pairCount++
        console.log('That is a pair!!')
          if (self.pairCount === self.images.length/2){
            self.nextLevel();
          } else {}
          
        // } 
        // else if (guess1[0] === imgSrc && guess1[1] === imgParentElement){
        //   console.log('exactly same image. same div')
      }
      else {
        self.imgTwo = event.target.children[0];
        self.imgTwo.setAttribute('class', 'image-shown');
        setTimeout (function(){
          self.imgOne.setAttribute('class', 'image-hidden');
          self.imgTwo.setAttribute('class', 'image-hidden');
        }, 1000)
        console.log('not a pair')
      }
      self.count = 0;
    }
    console.log(event.target.children[0]);
  }

  self.buildDom();
  self.buildLevel();

}

Game.prototype.buildDom = function () {
    var self = this;

  self.gameMainContainer = document.createElement('div');
  self.gameMainContainer.setAttribute('id', 'game');
  self.parentContainer.appendChild(self.gameMainContainer);

  self.header = document.createElement('div');
  self.header.setAttribute('class','header-container');
  self.parentContainer.appendChild(self.header);

  self.timerContainer = document.createElement('div');
  self.timerContainer.setAttribute('class','timer-container');
  self.header.appendChild(self.timerContainer);

  self.timeLabel = document.createElement('div');
  self.timeLabel.setAttribute('class','timer-label');
  self.timeLabel.innerText = 'time: ';
  self.timerContainer.appendChild(self.timeLabel);

  self.timerPrint = document.createElement('div');
  self.timerPrint.setAttribute('class','timer-print');
  self.timerContainer.appendChild(self.timerPrint);

  self.levelContainer = document.createElement('div');
  self.levelContainer.setAttribute('class','level-container');
  self.levelContainer.innerText = 'LEVEL';
  self.header.appendChild(self.levelContainer);

  self.scoreContainer = document.createElement('div');
  self.scoreContainer.setAttribute('class','score-container');
  self.header.appendChild(self.scoreContainer);

  self.scoreLabel = document.createElement('div');
  self.scoreLabel.setAttribute('class','score-label');
  self.scoreLabel.innerText = 'score';
  self.scoreContainer.appendChild(self.scoreLabel);

  self.scorePrint = document.createElement('div');
  self.scorePrint.setAttribute('class','score-print');
  self.parentContainer.appendChild(self.scorePrint);
}

Game.prototype.nextLevel = function () {
  var self = this;

  self.destroyLevel();
  self.level++;
  self.buildLevel();
};

Game.prototype.destroyLevel = function () {
  var self = this;

  clearInterval(self.countdown);

  self.flexBoxContainer.remove();

  self.images.forEach(function (item) {
    item.element.remove();
  })
};

Game.prototype.buildLevel = function () {
  var self = this;

  self.flexBoxContainer = document.createElement('div');
  self.flexBoxContainer.setAttribute('class','flex-box');
  self.gameMainContainer.appendChild(self.flexBoxContainer);

  self.guess1 = [];  /*1st index is the img src and 2nd is the element*/
  self.count = 0;
  self.pairCount = 0;

  var urls = self.levels[self.level].catalog.concat(self.levels[self.level].catalog);

  var shuffled = shuffle(urls);

  self.images = shuffled.map(function (item) {
    return {
      url: item,
      isOpen: false,
      element: null,
    };
  })

  self.images.forEach(function (item) {
    item.element = document.createElement('div');
    item.element.setAttribute('class','img-div');
    var img = document.createElement('img');
    img.setAttribute('src', item.url);
    img.setAttribute('class', 'image-hidden');
    item.element.appendChild(img);
    self.flexBoxContainer.appendChild(item.element);
    item.element.addEventListener('click', self.handleClickImage);
  } )

  // start the level timer internval
  self.timeOfLevel = self.levels[self.level].timer;
  self.countdown = setInterval(function() { 
    if (self.timeOfLevel >= 0) {
      self.timerPrint.innerText = Math.floor(self.timeOfLevel/1000);
    } 
    else {  
      self.onEnded();  
    }

  self.timeOfLevel = self.timeOfLevel-1000;
  }, 1000);

  // self.timerPrint.innerText = self.timeOfLevel/1000 + 's';

}

Game.prototype.destroy = function () {
  var self = this;
  clearInterval(self.countdown);
  self.gameMainContainer.remove();
  self.header.remove();
}

Game.prototype.onGameOver = function (callback){
  var self = this;
  self.onEnded = callback;
}

