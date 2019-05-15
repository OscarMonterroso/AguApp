
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

app.config(function($stateProvider, $urlRouterProvider){
  
  $stateProvider.state("Agua" , {
    url:"/Agua/:id" ,
    templateUrl:"templates/Agua.html"

    });
  
  
  
      $urlRouterProvider.otherwise("/List");
});




app.controller("ListCtrl", function($scope){
  $scope.notas = [
     { titulo:"Agua", descripcion:"Ver"},
     { titulo:"Video", descripcion:"Ver"},
     
     
   ];
}); 
app.controller("AguaCtrl", function($scope, $state){
  $scope.id = $state.params.id;
}); 
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  
  $stateProvider

 
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state("inicio",{
    url: '/inicio',
    templateUrl:'templates/inicio.html'
  })
  .state("adn",{
    url: '/adn',
    templateUrl:'templates/adn.html'
  })
  .state("agua",{
    url: '/agua',
    templateUrl:'templates/agua.html'
  })
  .state("video",{
    url: '/video',
    templateUrl:'templates/video.html'
  })
  .state("login",{
    url: '/login',
    templateUrl:'templates/login.html'
  })
  .state("registro",{
    url: '/registro',
    templateUrl:'templates/registro.html'
  })
  .state("nutricion",{
    url: '/nutricion',
    templateUrl:'templates/nutricion.html'
  })
  .state("info",{
    url: '/info',
    templateUrl:'templates/info.html'
  })
  .state("memoria",{
    url: '/memoria',
    templateUrl:'templates/memoria.html'
    }) 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/info');

});
const NUM_MAX_CARDS = 8
const NUM_TUPLE     = 2 

const Cards = [[1,
   {
    id:1,  
    source: "https://cdn5.dibujos.net/dibujos/pintados/201821/biologia-colegio-11376009.jpg"
  }],[2,

  {
    id:2,             source:"http://2.bp.blogspot.com/-kQ2INU9YZ8w/VSaeCq871oI/AAAAAAAAGHA/A0JnaTkkZtw/s1600/biologia.jpg",
  }],[3,
  
  {
    id:3,   
 source:"https://i0.wp.com/aprendergratis.es/wp-content/uploads/2017/07/02-e1500572870309.jpg?fit=560%2C560&ssl=1",
  }],[4,
  
  {
    id:4,      source:"https://principia.io/media/uploads/images/biomiics/biomiics-portada-principia.jpg",
  }],[5,
  
  {
    id:5,      source:"https://thumb7.shutterstock.com/display_pic_with_logo/695143/533425624/stock-vector-vector-illustration-of-cat-set-for-greeting-card-design-t-shirt-print-inspiration-poster-533425624.jpg",
  }], [6,
  
  {
    id:6,      source:"https://thumb7.shutterstock.com/display_pic_with_logo/695143/357914384/stock-vector-set-of-vector-doodle-cute-cats-avatars-357914384.jpg",
  }  ]
]

class Card {
  constructor(id, sourceFront) {
    
    this.liCard = this.renderCard(id)
    
    this.back = this.liCard.querySelector(".card-back")
    this.front = this.liCard.querySelector(".card-front")
    this.sourceFront = sourceFront
    
    this.isBack = true
    this.enabled = true
  }  
  
  flip(){
    if(this.enabled == true) {
      this.front.src = this.sourceFront
      this.back.classList.toggle("card-back-flip")
      this.front.classList.toggle("card-front-flip")      
      this.enabled = false
      this.isBack = false
      return true;
    }
    return false;
  }
  
  cover(){
    this.enabled = true
    this.isBack = true
    this.back.classList.toggle("card-back-flip")
    this.front.classList.toggle("card-front-flip")            
    this.front.src = this.back.src
  }
  
  say(say){
    this.front.classList.toggle("card-front-" + say)
  }
  
  renderCard(id) {
    const src = "https://media.tenor.com/images/ef2b68306eec03a5b50e4b32d7429599/tenor.gif"
    let cardBack = document.createElement('img')
    cardBack.className = "card-back" 
    cardBack.src = src

    let cardFront = document.createElement('img')
    cardFront.className = "card-front"
    cardFront.src = src

    let divCard = document.createElement('div')
    divCard.className = "card"
    divCard.appendChild(cardBack)
    divCard.insertBefore(cardFront, cardBack)

    let li = document.createElement('li')
    li.id = "card" + id
    li.className = "flex-item"
    li.appendChild(divCard)  

    return li
  }  
}

class Game{  
  constructor(onEndGame, elCanvas) {
    this.cards = new Map()
    this.cardsSelected = new Array()
    this.onEndGame = onEndGame.bind(this)
    this.numTuplesOK = 0
    this.numClicks = 0
    this.resultArray = ["ʘ‿ʘ Excelent!", "(´･_･`) Not bad", "¯\\_(ツ)_/¯ Bad "]
    this.elCanvas = elCanvas
    this.shuffleNum = [];
  }
  
  init(){
    let cardsMap = new Map(Cards);
    this.shuffle()
    this.cleanCanvas()
    
    for(let i=0; i<this.shuffleNum.length; i++){
      let num = (this.shuffleNum[i] % (NUM_MAX_CARDS/NUM_TUPLE)) +1    
      let card = cardsMap.get(num)
      let cardg = new Card(i, card.source)
      this.addCard(i, cardg)    
    }    
  }
  
  addCard(id, card){
    card.liCard.addEventListener('click',  this.onClick.bind(this, card))
    this.cards.set(id, card)
    this.elCanvas.appendChild(card.liCard)
  }

  onClick(card){          
    let flip = false
    if(this.cardsSelected.length < NUM_TUPLE){
      if (card.flip()){
        this.cardsSelected.push(card)      
        this.numClicks++
      }
      if(this.cardsSelected.length == NUM_TUPLE ){          
        this.enabledCards(false)
        if(!this.checkTupla()){
          setTimeout(()=>this.coverCards(), 1700)
          this.cardsSay("no", 1500)
          setTimeout(()=>this.enabledCards(true), 2000)
          setTimeout(()=>{this.cardsSelected = new Array()}, 2000)            
        }
        else{
          setTimeout(()=>this.enabledCards(true), 800)
          this.cardsSay("yes", 600)          
          setTimeout(()=>{this.cardsSelected = new Array()}, 700)
          
          this.numTuplesOK++
          if(this.numTuplesOK === NUM_MAX_CARDS / NUM_TUPLE)
            setTimeout(()=>{this.endGame()}, 1000)                                  
        }
      }      
    }    
  }    
  
  checkTupla(){
    if(this.cardsSelected.length > 0){
      let srcFilter = this.cardsSelected[0].sourceFront 
      let ce = this.cardsSelected.filter(card=> card.sourceFront ===  srcFilter)
      return ce.length === this.cardsSelected.length
    }
    return false
  }
  
  
  cardsSay(say, delay){
    this.cardsSelected.forEach(function(card) {   
      setTimeout(()=> card.say(say), delay - 350)
      setTimeout(()=> card.say(say), delay)            
    })   
  }
  
  coverCards(){
    this.cardsSelected.forEach(function(card){        
      card.cover()
    })           
  }
  
  enabledCards(value){
    this.cards.forEach(function(card) {  
      if(card.isBack)
        card.enabled = value
    })       
  }
  
  endGame(){
    let numClicksMin = NUM_MAX_CARDS
    let resultIndex = this.resultArray.length - 1
    
    if(this.numClicks === numClicksMin)
      resultIndex = 0
    
    if(this.numClicks > numClicksMin && this.numClicks <= numClicksMin * 2 )
      resultIndex = 1
    
    if(this.numClicks >= numClicksMin * 2 )
      resultIndex = 2
        
    this.onEndGame( this.resultArray[resultIndex], this.numClicks)
  }
  
  cleanCanvas(){
    while (this.elCanvas.firstChild) {
      this.elCanvas.removeChild(this.elCanvas.firstChild);
    }    
  }
  
  randomNum(min, max) { return Math.round(Math.random() * (max - min) + min) }

  shuffle(){
    this.shuffleNum = [];
    for(var i=0; i<NUM_MAX_CARDS; i++) {
      var num = this.randomNum(1,NUM_MAX_CARDS);
      console.log(num)
      if(this.shuffleNum.indexOf(num) >= 0) {
          i = i-1;
      } else {
            this.shuffleNum[i] = num;
      }
    }
  }  
}


function startGame(){
  let cards = document.getElementById("cards");
  let game = new Game(endGame, cards)
  game.init()
}

function playNow(){
  land.classList.toggle("land-hide");
  startGame();
}

function playAgain(){
  result.classList.toggle("land-hide");
  startGame();
}

function endGame(resultGame, score){  
  document.getElementById('result-msg').innerHTML = resultGame + " - " + score + " Clicks";  
  result.classList.toggle("land-hide");  
}
var mat = [];
var cartas = [];
var posiciones = [];
var rand = 0;
var carta1 = 0;
var parejas = 4;


function llenarMemoria(){
  for(var i = 1; i < 9; i++){
    mat[i-1] = i; 
  }
  for(var i = 1; i < 9; i++){
    mat[i+7] = i; 
  }
}

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

function asignar(c){
  if(cartas.length < 2){
    cartas.push(mat[c-1]);
  }
  if(posiciones.length < 2){
    posiciones.push(c);
  }
  var element = document.getElementById(c); 
  switch(mat[c-1]){
      case 1:
         if(element.classList.contains("carta")) {
             element.classList.toggle("A");
 
         }
      break;
      case 2:
        if(element.classList.contains("carta")) {
             element.classList.toggle("B");
          
         }
      break;
      case 3:
        if(element.classList.contains("carta")) {
             element.classList.toggle("C");
         }
      break;
      case 4:
        if(element.classList.contains("carta")) {
             element.classList.toggle("D");
         }
      break;
      case 5:
        if(element.classList.contains("carta")) {
             element.classList.toggle("E");
         }
      break;
      case 6:
        if(element.classList.contains("carta")) {
             element.classList.toggle("F")
         }
      break;
      case 7:
        if(element.classList.contains("carta")) {
             element.classList.toggle("G")
         }
      break;
      case 8:
        if(element.classList.contains("carta")) {
             element.classList.toggle("H")
         }
      break;
    }
}

function resetearCarta(){
  for(var i = 0; i < cartas.length; i++){
    var element = document.getElementById(posiciones[i]);
    switch(cartas[i]){
      case 1:
         if(element.classList.contains("carta")) {
             element.classList.toggle("A")
         }
      break;
      case 2:
        if(element.classList.contains("carta")) {
             element.classList.toggle("B")
         }
      break;
      case 3:
        if(element.classList.contains("carta")) {
             element.classList.toggle("C")
         }
      break;
      case 4:
        if(element.classList.contains("carta")) {
             element.classList.toggle("D")
         }
      break;
      case 5:
        if(element.classList.contains("carta")) {
             element.classList.toggle("E")
         }
      break;
      case 6:
        if(element.classList.contains("carta")) {
             element.classList.toggle("F")
         }
      break;
      case 7:
        if(element.classList.contains("carta")) {
             element.classList.toggle("G")
         }
      break;
      case 8:
        if(element.classList.contains("carta")) {
             element.classList.toggle("H")
         }
      break;
    }
  }
  cartas = [];
  posiciones = []
}

function cartasIguales(){
  for(var i = 0; i < cartas.length; i++){
    var element = document.getElementById(posiciones[i]);
    element.classList.add("par");
  }
   parejas --;
   ganador();
   cartas = [];
   posiciones = [];
  
}

function comparaCarta(){
  if(cartas.length == 2){
    if(cartas[0]!=cartas[1]){
      setTimeout(function(){ resetearCarta() }, 450);
    }
    else{
      cartasIguales();
    }
  }
}

function ganador(){
  if(parejas ==0){
    document.getElementById('win').style.display = "block";
    document.getElementById('win').innerHTML = "En Horabuena! has completado el juego";
  }
}

document.addEventListener("click", function(e) {
  if(e.target.classList.contains("carta")) {
    asignar(e.target.id);
    comparaCarta();
 
}})



llenarMemoria();  
shuffle(mat);
console.log(mat);




