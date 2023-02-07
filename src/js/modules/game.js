export function game() {
    class memoryGame {
        constructor(totalTime, cards) {
            this.cardsArrey = cards;
            this.totalTime = totalTime;
            this.timeRemaining = totalTime;
            this.timer = document.getElementById("timer");
            this.ticker = document.getElementById("flips");
        }

        startGame() {
            this.cardToCheck = null;
            this.totalClick = 0;
            this.timeRemaining = this.totalTime;
            this.matchedCards = [];
            this.busy = true;

            setTimeout(() => {
                this.mixCards();
                this.countDown = this.startCountDown();
                this.busy = false;
            }, 300);

            this.hideCards();
            this.timer.innerText = this.timeRemaining;
            this.ticker.innerText = this.totalClick;
        }

        refreshGame() {
            clearInterval(this.countDown);
            this.startGame();
        }

        startCountDown() {
            return setInterval(() => {
                this.timeRemaining--;
                this.timer.innerText = this.timeRemaining;
                if (this.timeRemaining === 0) {
                    this.gameOver();
                }
            }, 1000);
        }

        gameOver() {
            clearInterval(this.countDown);
            document.getElementById('game-over').classList.add('visible');
        }

        victory() {
            clearInterval(this.countDown);
            document.getElementById('game-victory').classList.add('visible');
            this.hideCards();
        }

        hideCards() {
            this.cardsArrey.forEach((card) => {
                card.classList.remove("active");
                card.classList.remove("matched");
            });
        }

        flipCard(card) {
            if (this.canFlipCard(card)) {
                this.totalClick++;
                this.ticker.innerText = this.totalClick;
                card.classList.add("active");

                if (this.cardToCheck) {
                    this.checkForCardMatch(card);
                } else {
                    this.cardToCheck = card;
                }
            }
        }

        checkForCardMatch(card) {
            if (this.getCardSrc(card) === this.getCardSrc(this.cardToCheck)) {
                this.cardMatch(card, this.cardToCheck);
            } else {
                this.missMatch(card, this.cardToCheck);
            }

            this.cardToCheck = null;
        }

        getCardSrc(card) {
            return card.getElementsByClassName('icon-forward')[0].src;
        }

        cardMatch(card1, card2) {
            this.matchedCards.push(card1);
            this.matchedCards.push(card2);
            card1.classList.add("matched");
            card2.classList.add("matched");

            if (this.matchedCards.length === this.cardsArrey.length) {
                this.victory(); 
            }
        }

        missMatch(card1, card2) {
            this.busy = true;
            setTimeout(() => {
                card1.classList.remove("active");
                card2.classList.remove("active");
                this.busy = false;
            }, 1000)
        }

        mixCards() {
            for (let i = this.cardsArrey.length - 1; i > 0; i--) {
                let randIndex = Math.floor(Math.random() * (i + 1));
                this.cardsArrey[randIndex].style.order = i;
                this.cardsArrey[i].style.order = randIndex;
            }
        }

        canFlipCard(card) {
            return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck)
        }
    }

    const overlays = document.querySelectorAll(".over-text");
    const cards = document.querySelectorAll(".card");
    const refresh = document.getElementById("refresh");
    let game = new memoryGame(60, cards);

    overlays.forEach((over) => {
        over.addEventListener("click", () => {
            over.classList.remove("visible");
            game.startGame();
        });
    });

    refresh.addEventListener('click', () => {
        game.refreshGame();
    });

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            game.flipCard(card);
        });
    });
}