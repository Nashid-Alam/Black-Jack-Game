let suits = ['heart', 'spade', 'clove', 'diamond']
let cards = [2,3,4,5,6,7,8,9,10,'J','K','Q','A']
let deck = []
let currentDraw=[]
let player1Counter=0
let player2Counter=0
let gameIsLive = true
let player=['1','2']

for (let i = 0; i < cards.length; i++){
  for(let j = 0; j < suits.length; j++){
    let value = null
    if (cards[i] === 'A') {
      value = [1, 11]
    } else if (typeof cards[i] === 'string') {
      value = 10
    } else {
      value = cards[i]
    }

    let card = {
      'card': cards[i],
      'suit': suits[j],
      'value': value
    }
    deck.push(card)
  }
}

console.log(deck)
function hitCardPlayer1(){
  randomIndex = Math.floor(Math.random()*deck.length);
  randomDraw = deck[randomIndex];
  currentDraw.push(randomDraw);
  if(gameIsLive===true && player1Counter<21){
    player1Counter = player1Counter + randomDraw.value;
   
  }
  else{
     gameIsLive === false;
    //display winner
  }
  
}
hitCardPlayer1()
hitCardPlayer1()
console.log(randomDraw)
console.log(player1Counter)

function hitCardPlayer2(){
  randomIndex = Math.floor(Math.random()*deck.length);
  randomDraw = deck[randomIndex];
  currentDraw.push(randomDraw);
  if(gameIsLive===true && player2Counter<21){
    player2Counter = player2Counter + randomDraw.value;
   
  }
  else{
     gameIsLive === false;
    //display winner
  }
  
}
hitCardPlayer2()
hitCardPlayer2()
console.log(randomDraw)
console.log(player2Counter)