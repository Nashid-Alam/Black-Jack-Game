let suits = ["&hearts;", "&spades;", "&clubs;", "&diams;"]
let cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "K", "Q", "A"]
let deck = []
let gameOver = false

const player1 = {
  name: "player1",
  hand: [],
  isPlaying: true,
  handScore: 0,
}
const computer = {
  name: "computer",
  hand: [],
  isPlaying: false,
  handScore: 0,
}

const hitButton = document.querySelector(".hitButton")
const standButton = document.querySelector(".standButton")

const playerScoreDisplay = document.querySelector("#player1Score")
const computerScoreDisplay = document.querySelector("#computerScore")

//Generates the deck
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

// Draw card function
function drawCard() {
  if (!gameOver) {
    const card = deck.pop()
    return card
  }
}

// Hit function
function hitMe(player) {
  if (!player.isPlaying) {
    return
  }

  if (player.handScore >= 21) {
    return
  }

  const card = drawCard()
  player.hand.push(card)
  player.handScore = player.handScore + card.value

  const cardLi = document.createElement("li")
  const cardSuitTop = document.createElement("div")
  const cardValue = document.createElement("div")
  const cardSuitBottom = document.createElement("div")

  cardLi.className = "card"
  cardSuitTop.className = "suitTop"
  cardValue.className = "cardValue"
  cardSuitBottom.className = "suitBottom"

  if (card.suit === "&hearts;" || card.suit === "&diams;") {
    cardSuitTop.style.color = "red"
    cardValue.style.color = "red"
    cardSuitBottom.style.color = "red"
  } else {
    cardSuitTop.style.color = "black"
    cardValue.style.color = "black"
    cardSuitBottom.style.color = "black"
  }

  cardSuitTop.innerHTML = card.suit
  cardValue.innerHTML = card.card
  cardSuitBottom.innerHTML = card.suit

  cardLi.append(cardSuitTop)
  cardLi.append(cardValue)
  cardLi.append(cardSuitBottom)

  const handOl = document.querySelector(`#${player.name}-hand`)
  handOl.append(cardLi)
}

// Event Litsener Functions
function hitPlayer(e) {
  hitMe(player1)
  playerScoreDisplay.innerHTML = player1.handScore
}

function standPlayer(e) {
  player1.isPlaying = false
  computer.isPlaying = true
  computerGoes()
}

function computerGoes() {
  while (computer.handScore < 17) {
    hitMe(computer)
    computerScoreDisplay.innerHTML = computer.handScore
    // settimer before running the loop again
  }
}

// win conditions
if ((player1.handScore = 21)) {
  console.log("player 1 wins")
}

if (player1.handScore > 21) {
  console.log("player 1 loses")
}

if (computer.handScore > 21) {
  console.log("computer loses and player 1 wins")
}

if (player1.handScore > computer.handScore) {
  console.log("computer loses and player 1 wins")
} 

if (player1.handScore = computer.handScore) {
  console.log('its a tie!!')
} else {
  console.log("player 1 loses computer wins")
}

//(computerCounter>=17 && computerCounter<=21){
//   if(player1Counter>computerCounter){
//     console.log("player 1 wins")
//   }
//   else{
//     console.log( "player 2 wins")
//   }
// }

//Event listeners
hitButton.addEventListener("click", hitPlayer)
standButton.addEventListener("click", standPlayer)
