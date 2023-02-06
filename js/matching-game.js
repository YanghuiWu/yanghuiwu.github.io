const cards = document.querySelectorAll(".card");
var flippedCards = [];
var matchedCards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");


    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.querySelector(".front img").src === secondCard.querySelector(".front img").src;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    lockBoard = true;
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    setTimeout(() => {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        resetBoard();
    }, 800);
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 800);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos.toString();
    });
})();

cards.forEach(card => card.addEventListener("click", flipCard));
