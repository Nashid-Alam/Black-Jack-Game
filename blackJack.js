let suits = ["&hearts;", "&spades;", "&clubs;", "&diams;"]
let cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "K", "Q", "A"]
let deck = []

let playerHand = []
let player1Counter = 0
let playerIsPlaying = true
let computerHand = []
let computerCounter = 0

let hit1 = document.querySelector(".hit1")
const stand1 = document.querySelector(".stand1")
const counterPlayer1Display = document.querySelector(".counterPlayer1")
const countercomputerDisplay = document.querySelector(".counterComputer")
const hit2 = document.querySelector(".hit2")
const stand2 = document.querySelector(".stand2")

//Generate the deck
for (let i = 0; i < cards.length; i++) {
  for (let j = 0; j < suits.length; j++) {
    let value = null
    if (cards[i] === "A") {
      value = 11
    } else if (typeof cards[i] === "string") {
      value = 10
    } else {
      value = cards[i]
    }

    let card = {
      card: cards[i],
      suit: suits[j],
      value: value,
    }
    deck.push(card)
  }
}

// Hit function
function hitCardPlayer1(e) {
  if (!playerIsPlaying) {
    return
  }

  if (player1Counter >= 21) {
    // Do things here because game is over.  Either player1 lost = Bust, or player1 won
    return
  }

  randomIndex = Math.floor(Math.random() * deck.length)
  randomDraw = deck[randomIndex]
  playerHand.push(randomDraw)

  const handOl = document.querySelector("#player1-hand")
  const cardLi = document.createElement("li")
  const cardSuitTop = document.createElement("div")
  const cardValue = document.createElement("div")
  const cardSuitBottom = document.createElement("div")
  if (randomDraw.suit === "&hearts;" || randomDraw.suit === "&diams;") {
    cardSuitTop.style.color = "red"
    cardSuitTop.innerHTML = randomDraw.suit
    cardValue.style.color = "red"
    cardValue.innerHTML = randomDraw.card
    cardSuitBottom.style.color = "red"
    cardSuitBottom.innerHTML = randomDraw.suit
  } else {
    cardSuitTop.style.color = "black"
    cardSuitTop.innerHTML = randomDraw.suit
    cardValue.style.color = "black"
    cardValue.innerHTML = randomDraw.card
    cardSuitBottom.style.color = "black"
    cardSuitBottom.innerHTML = randomDraw.suit
  }
  cardLi.className = "cardLayout"
  cardSuitTop.className = "suitTop"
  cardValue.className = "card"
  cardSuitBottom.className = "suitBottom"

  cardLi.append(cardSuitTop)
  cardLi.append(cardValue)
  cardLi.append(cardSuitBottom)
  handOl.append(cardLi)

  player1Counter = player1Counter + randomDraw.value
  counterPlayer1Display.innerHTML = player1Counter
}

// Stand function
function standPlayer1(e) {
  playerIsPlaying = false
}

function computerTurn() {
  //if(playerIsPlaying = false){
  randomIndex = Math.floor(Math.random() * deck.length)
  randomDraw = deck[randomIndex]
  computerHand.push(randomDraw)

  const handOlComputer = document.querySelector("#computer-hand")
  const cardLiComputer = document.createElement("li")
  const cardSuitTopComputer = document.createElement("div")
  const cardValueComputer = document.createElement("div")
  const cardSuitBottomComputer = document.createElement("div")

  cardSuitTopComputer.innerHTML = randomDraw.suit
  cardValueComputer.innerHTML = randomDraw.card
  cardSuitBottomComputer.innerHTML = randomDraw.suit

  cardLiComputer.className = "cardLayout"
  cardSuitTopComputer.className = "suitTop"
  cardValueComputer.className = "card"
  cardSuitBottomComputer.className = "suitBottom"

  cardLiComputer.append(cardSuitTopComputer)
  cardLiComputer.append(cardValueComputer)
  cardLiComputer.append(cardSuitBottomComputer)
  handOlComputer.append(cardLiComputer)

  computerCounter = computerCounter + randomDraw.value
  countercomputerDisplay.innerHTML = computerCounter
  // display card
  // updater the computerCounter
  // WHILE the compterCounter is less than 17
  // grab random cards and push them into the computer hand, keep doing this until counter is 17 or more

  // once you are out of the while loop check the score and display the correct messages
  //}
}
// win condition
// if(computerCounter>=17 && computerCounter<=21){
//   if(player1Counter>computerCounter){
//     console.log("player 1 wins")
//   }
//   else{
//     console.log( "player 2 wins")
//   }
// }

//Event listeners
hit1.addEventListener("click", hitCardPlayer1)
stand1.addEventListener("click", standPlayer1)
hit2.addEventListener("click", computerTurn)

// Suffle Deck Function
//function shuffleDeck(){

//}
