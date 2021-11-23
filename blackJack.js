let suits = ["&hearts;", "&spades;", "&clubs;", "&diams;"]
let cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]
let deck = []
let gameOver = false
let scoreBoard = 100

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
const scoreBoardDisplay = document.querySelector(".money")
const cashoutButton = document.querySelector(".cashout-Button")
const hitButton = document.querySelector(".hitButton")
const standButton = document.querySelector(".standButton")
const resetButton = document.querySelector(".reset-Button")

const playerScoreDisplay = document.querySelector("#player1Score")
const computerScoreDisplay = document.querySelector("#computerScore")
const player1resultDisplay = document.querySelector(".player1-result")
const computerresultDisplay = document.querySelector(".computer-result")

function generateDeck() {
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
}
generateDeck()

// Fisher-Yates algorithm.
function shuffledeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i)
    let temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
}
shuffledeck()

function drawCard() {
  if (!gameOver) {
    const card = deck.pop()
    return card
  }
}

function updateScore(player) {
  let tempScore = 0
  let indexOfAces = []

  for (let i = 0; i < player.hand.length; i++) {
    tempScore = tempScore + player.hand[i].value

    if (player.hand[i].value === 11) {
      indexOfAces.push(i)
    }
  }

  if (tempScore > 21 && indexOfAces.length > 0) {
    while (tempScore > 21) {
      player.hand[indexOfAces[0]].value = 1
      indexOfAces.shift()
      tempScore = tempScore - 10
    }
  }

  player.handScore = tempScore
}

function hitMe(player) {
  if (!player.isPlaying) {
    return
  }
  if (player.handScore >= 21) {
    return
  }

  const card = drawCard()
  player.hand.push(card)
  updateScore(player)

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

  if (player1.handScore === 21) {
    scoreBoard = scoreBoard + 100
    scoreBoardDisplay.innerHTML = scoreBoard
    player1resultDisplay.style.opacity = "1"
    player1resultDisplay.innerHTML = " winner!"
    gameOver = true
  }
  if (player1.handScore > 21) {
    scoreBoard = scoreBoard - 100
    scoreBoardDisplay.innerHTML = scoreBoard
    player1resultDisplay.style.opacity = "1"
    player1resultDisplay.innerHTML = "Bust!"
    gameOver = true
  }
}

function computerGoes() {
  while (computer.handScore < 17) {
    hitMe(computer)
    computerScoreDisplay.innerHTML = computer.handScore
    // settimer before running the loop again
  }

  if (computer.handScore > 21) {
    scoreBoard = scoreBoard + 100
    scoreBoardDisplay.innerHTML = scoreBoard
    computerresultDisplay.style.opacity = "1"
    return (computerresultDisplay.innerHTML = "Bust!")
  }

  if (player1.handScore > computer.handScore) {
    scoreBoard = scoreBoard + 100
    scoreBoardDisplay.innerHTML = scoreBoard
    player1resultDisplay.style.opacity = "1"
    player1resultDisplay.innerHTML = "Winner!"
    computerresultDisplay.style.opacity = "1"
    computerresultDisplay.innerHTML = "Lost!"
    return
  }

  if (player1.handScore === computer.handScore) {
    computerresultDisplay.style.opacity = "1"
    computerresultDisplay.innerHTML = "its a tie!"
    return
  } else {
    scoreBoard = scoreBoard - 100
    scoreBoardDisplay.innerHTML = scoreBoard
    computerresultDisplay.style.opacity = "1"
    return (computerresultDisplay.innerHTML = "Dealer wins!")
  }
}

// Event Litsener Functions
function hitPlayer(e) {
  hitMe(player1)
  playerScoreDisplay.innerHTML = player1.handScore
}

function standPlayer(e) {
  if (gameOver === false) {
    player1.isPlaying = false
    computer.isPlaying = true
    computerGoes()
  }
}

function reset(e) {
  generateDeck()
  shuffledeck()
  player1.hand = []
  player1.isPlaying = true
  player1.handScore = 0
  computer.hand = []
  computer.isPlaying = false
  computer.handScore = 0
  playerScoreDisplay.innerHTML = 0
  computerScoreDisplay.innerHTML = 0
  document.querySelector("#player1-hand").innerHTML = ""
  document.querySelector("#computer-hand").innerHTML = ""
  player1resultDisplay.innerHTML = ""
  computerresultDisplay.innerHTML = ""
  gameOver = false
}

function cashout(e) {
  document.body.innerHTML = `cash out value \n $ ${scoreBoard}`
  document.body.style.color = "white"
  document.body.style.fontSize = "40px"
}

//Event listeners
hitButton.addEventListener("click", hitPlayer)
standButton.addEventListener("click", standPlayer)
resetButton.addEventListener("click", reset)
cashoutButton.addEventListener("click", cashout)
