'use strict';

// Variables
const cards = document.querySelectorAll('.memory-card');
let cardNumber = cards.length;
const infoData = document.querySelector('.info');
const counter = document.querySelector('.counter');
const cheerPhrase = document.querySelector('.cheer');
const counterInfo = document.querySelector('.counter-info');
const gameTable = document.querySelector('.memory-game');
const modal = document.querySelector('.modal');
const finalScore = document.querySelector('.user-score'); 
let time = 0;
const clock = document.querySelector('.clock');
clock.innerHTML = time;
let hasFlipCard = false;
let firstCard, secondCard;
let blockBoard = false;
let tries = 0;
counter.innerHTML = tries;

//Funcion to increase the counter and say something to the player
function increaseCounter() {
   tries = tries + 1;
   counter.innerHTML = tries;
   switch(tries) {
    case 5:
    cheerPhrase.innerHTML = "¡Focus!"; 
      break;
    case 10:
    cheerPhrase.innerHTML = "You are not the smartest of your class, right?";
      break;
    case 15:
    cheerPhrase.innerHTML = "Ufff, maybe you are good at something....something else.";
    break;
  }
}

//funcion to increase timer (only seconds, not minuts)
function timerCounter() {
    cards.forEach(card => card.removeEventListener('click', timerCounter));
    let timeCountUp = setInterval(() => {
        time = time + 1;
        clock.innerHTML = time;
        score();
    }, 1000);
}

function flipCard() {
    //To prevent click in more than two cards
    if (blockBoard) return;
    //To prevent double-click in the same card
    if (firstCard === this) return;
    //Flip the card to see back img
    this.classList.toggle('flip');
    //Select the first and second card
    if(!hasFlipCard) {
        hasFlipCard = true;
        firstCard = this;
    } else {
        hasFlipCard = false;
        secondCard = this;
         //Test if there is a match between the cards
        isMatching();
    }
    
}



function isMatching() {
    increaseCounter();
    if (firstCard.dataset.animal === secondCard.dataset.animal) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetTheBoard();
    }else {
        //To prevent click in more than two cards
        blockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            blockBoard = false;
            resetTheBoard();
        }, 800)
    } 
    //Check when the game finish
    const flippedCards = document.querySelectorAll('.flip');
    let flipCardNumber = flippedCards.length;
    if(flipCardNumber === cardNumber) {
        console.log('has ganado');
        gameTable.classList.add('hidden');
        modal.classList.remove('hidden');
        infoData.classList.add('hidden');
        clearInterval(timeCountUp);
    } 
}

function resetTheBoard() {
    //Reset the board using destructuring and return values to false and null
    [hasFlipCard, blockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//Function to shuffle tha cards
(function shuffle() {
    cards.forEach(card => {
        let randomOrder = Math.floor(Math.random()*12);
        card.style.order = randomOrder;
    })
})();



//Function to calculate score
function score() {
    let userScore = 10000 - (time*10) - (tries*50);
    console.log(userScore);
    finalScore.innerHTML = userScore;

}

  


//Event Listener so we can flip the every card
cards.forEach(card => card.addEventListener('click', flipCard));
cards.forEach(card => card.addEventListener('click', timerCounter));

//Task
//the counter has to stop when the player wins (is playerWin igual a true o algo asi se puede probar), con un return en el contador

//maquetacion
//quitar el degradado??
