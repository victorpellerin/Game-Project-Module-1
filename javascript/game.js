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

  // Set general Time Out that depends on the level of the game
  // window.setTimeout( function() {
  //   self.destroy();
  // }, 5000);

  self.handleClickImage = function (event) {
    var imgSrc = event.target.src;
    var imgParentElement = event.target.parentElement;
    if (self.count === 0){
      // Show image
      self.guess1[0] = imgSrc;
      self.guess1[1] = imgParentElement;
      self.count++;
      console.log('first image')
    } 
    else {
      if (self.guess1[0] === imgSrc && self.guess1[1] !== imgParentElement){ 
        imgParentElement.setAttribute('class', 'hidden');
        self.guess1[1].setAttribute('class', 'hidden');
        imgParentElement.removeEventListener('click', self.handleClickImage);
        // Put a filter in both pictures
        self.pairCount++
        if (self.pairCount === self.images.length/2){
          self.nextLevel();
        }
        console.log('That is a pair!!')
        // } 
        // else if (guess1[0] === imgSrc && guess1[1] === imgParentElement){
        //   console.log('exactly same image. same div')
      }
      else {
        // Set TimeOut to hide both cards
        console.log('not a pair')
      }
      self.count = 0;
    }
    console.log(event.target);
  }

  self.buildDom();
  self.buildLevel();

}

Game.prototype.buildDom = function () {
  var self = this;

  self.header = document.createElement('header');
  self.header.setAttribute('class','header');
  self.header.innerText = 'GAME SCREEN';
  self.parentContainer.appendChild(self.header);

  self.gameMainContainer = document.createElement('div');
  self.gameMainContainer.setAttribute('id', 'game');
  self.parentContainer.appendChild(self.gameMainContainer);

  // self.titleContainer = document.createElement('div');
  // self.titleContainer.setAttribute('class','game-title');
  // self.titleContainer.innerText = 'GAME SCREEN';
  // self.gameMainContainer.appendChild(self.titleContainer);


  self.flexBoxContainer = document.createElement('div');
  self.flexBoxContainer.setAttribute('class','flex-box');
  self.gameMainContainer.appendChild(self.flexBoxContainer);
}

Game.prototype.nextLevel = function () {
  var self = this;

  self.destroyLevel();
  self.level++;
  self.buildLevel();
};

Game.prototype.destroyLevel = function () {
  var self = this;

  // clear the level timer

  self.images.forEach(function (item) {
    item.element.remove();
  })
};

Game.prototype.buildLevel = function () {
  var self = this;

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
    item.element.appendChild(img);
    self.flexBoxContainer.appendChild(item.element);
    item.element.addEventListener('click', self.handleClickImage);
  })

  // start the level timer internval

}

Game.prototype.destroy = function () {
  var self = this;
  self.gameMainContainer.remove();

  // clear interval for level timer here
}



// var Base=function(){
//   function a(a){this.pageParams=a}
//   return a.prototype.init=function(){
//     this.handleEvents()},

//   a.prototype.handleEvents=function(){
//     this.handleVisibility(),
//     this.handleFilters(),
//     this.handleAds()},

//     a.prototype.handleVisibility=function(){
//       $(".switch-visibility").on("click",function(){
//         var a=$(this).attr("data-show-class");
//         var b=$(this).attr("data-hidden-class");
//         void 0!=a&&void 0!=b&&($("body").find("."+a).removeClass("hidden").addClass("show"),
//         $("body").find("."+b).removeClass("show").addClass("hidden"))
//       }
//     )},

//         a.prototype.handleFilters=function(){
//           $(".filter-box").click(function(){
//             $(this).parent().hasClass("active")?"filter-all"!=$(this).attr("id")&&($(this).parent().removeClass("active"),
//             $("."+$(this).attr("id")).hide(),
//             $("."+$(this).attr("id")).each(function(a,b){var c=$(b).attr("class");
//             c=c.split(" ");
//             for(var d=0;d<c.length;d++)$("#"+c[d]).parent().hasClass("active")&&$(b).show()}),
//             $(".filter-box").parent().hasClass("active")||($("#filter-all").parent().addClass("active"),
//             $(".filter").show())):"filter-all"==$(this).attr("id")?($(".filter-box").parent().removeClass("active"),
//             $("#filter-all").parent().addClass("active"),
//             $(".filter").show()):($("#filter-all").parent().hasClass("active")&&($("#filter-all").parent().removeClass("active"),
//             $(".filter").hide()),
//             $(this).parent().addClass("active"),
//             $("."+$(this).attr("id")).show())})},
//             a.prototype.handleAds=function(){$(document.body).click(function(a){a.target==this&&void 0!=jsVars.custom_style_bg_link&&window.open(jsVars.custom_style_bg_link,
//               "_blank")}),
//               $(document.body).mouseover(function(a){a.target==this&&void 0!=jsVars.custom_style_bg_link?$(this).css("cursor","pointer"):$(this).css("cursor","default")})},
//               a}();