'use strict';

// suffle function ghere
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



function Game(parentContainer, catalog) {
  var self = this;

  self.gameMainContainer = document.createElement('div');
  self.gameMainContainer.setAttribute('id', 'game');
  self.gameMainContainer.innerText = 'Game screen';
  parentContainer.appendChild(self.gameMainContainer);

  
  var urls = catalog.concat(catalog);

  var shuffled = shuffle(urls);

  self.images = shuffled.map(function (item) {
    return {
      url: item,
      isOpen: false,
      element: null,
    };
  })

  self.handleClickImage = function (event) {
    console.log(event.target);
  }

  self.images.forEach(function (item) {
    item.element = document.createElement('div');
    var img = document.createElement('img');
    img.setAttribute('src', item.url);
    item.element.appendChild(img);
    self.gameMainContainer.appendChild(item.element);
    item.element.addEventListener('click', self.handleClickImage);
  })
  // item.element = new dom element (a div)
   
  // var img is a new dom element (a img)
  // the img src is item.url
  // item.element.appendChild(img)
  // flexContainer.appendChild(item.element);
  // item.addEvent.. "click", self.handleClick
}

Game.prototype.destroy = function () {
  var self = this;
  self.gameMainContainer.remove();
}
