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


function Game(parentContainer, catalog) {
  var self = this;

  // Set general Time Out that depends on the level of the game
  // window.setTimeout( function() {
  //   self.destroy();
  // }, 5000);

  self.gameMainContainer = document.createElement('div');
  self.gameMainContainer.setAttribute('id', 'game');
  parentContainer.appendChild(self.gameMainContainer);

  self.titleContainer = document.createElement('div');
  self.titleContainer.setAttribute('class','game-title');
  self.titleContainer.innerText = 'GAME SCREEN';
  self.gameMainContainer.appendChild(self.titleContainer);


  var flexBoxContainer = document.createElement('div');
  flexBoxContainer.setAttribute('class','flex-box');
  self.gameMainContainer.appendChild(flexBoxContainer);

  var urls = catalog.concat(catalog);

  var shuffled = shuffle(urls);

  self.images = shuffled.map(function (item) {
    return {
      url: item,
      isOpen: false,
      element: null,
    };
  })

  var guess1 = [];  /*1st index is the img src and 2nd is the element*/
  var count = 0;
  var pairCount = 0;

  self.handleClickImage = function (event) {
    var imgSrc = event.target.src;
    var imgParentElement = event.target.parentElement;
    if (count === 0){
      // Show image
      guess1[0] = imgSrc;
      guess1[1] = imgParentElement;
      count++;
      console.log('first image')
    } 
    else {
      if (guess1[0] === imgSrc && guess1[1] !== imgParentElement){ 
        imgParentElement.setAttribute('class', 'hidden');
        guess1[1].setAttribute('class', 'hidden');
        imgParentElement.removeEventListener('click', self.handleClickImage);
        // Put a filter in both pictures
        pairCount++
          if (pairCount === self.images.length/2){
            self.destroy(); 
            new Game(parentContainer, catalog); // ===============================> GO TO NEXT LEVEL
          } else {
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
      count = 0;
    }
    console.log(event.target);
  }

  self.images.forEach(function (item) {
    item.element = document.createElement('div');
    item.element.setAttribute('class','img-div');
    var img = document.createElement('img');
    img.setAttribute('src', item.url);
    item.element.appendChild(img);
    flexBoxContainer.appendChild(item.element);
    item.element.addEventListener('click', self.handleClickImage);
  })
}

Game.prototype.destroy = function () {
  var self = this;
  self.gameMainContainer.remove();
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