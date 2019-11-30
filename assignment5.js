counter = 0;

wrong = 0;

function refreshPage() {
    window.location.reload();
}

function startGame() {
    let start = document.getElementById("container");
    start.style.filter = "none";
    let fade = document.getElementById("opening");
    fade.style.display = "none";
}

const cards = document.querySelectorAll(".memory-card");

let flippedCard = false;
let lock = false;
let firstCard, secondCard;

function flipCard() {
    if (lock) return;
    if (this === firstCard) return;
    this.classList.add("flip");
    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    match();
}

function match() {
    if (firstCard.id === secondCard.id) {
        counter = counter + 1;
        console.log("correct: " + counter);
        disableCards();
        gameOver();
        return;
    }
    else {
        wrong = wrong + 1;
        console.log("wrong: " + wrong);
    }
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    lock = true;
    setTimeout(function () {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [flippedCard, lock] = [false, false];
    [firstCard, secondCard] = [null, null];
}

let card = document.getElementById(".memory-card");

cards.forEach(function (card) {
    card.addEventListener("click", flipCard);
})

let cardOrder = document.getElementById(".memory-card");

(function shuffle() {
    cards.forEach(function (cardOrde) {
        let mixed = Math.floor(Math.random() * 12);
        cardOrde.style.order = mixed;
    });
})();

function gameOver() {
    if (counter === 6) {
        let finish = document.getElementById("popup");
        finish.style.display = "flex";
        finish.style.position = "absolute";
        finish.style.top = "20%";
        finish.style.left = "25%";
        let fade = document.getElementById("container");
        fade.style.filter = "blur(20px)";
        var paragraph = document.getElementById("popup");
        var text = document.createTextNode(`Wrong Guesses: ${wrong}`);
        paragraph.appendChild(text);
    }
}
