let restGame = document.querySelector("#resetGame")
let newGame = document.querySelector("#newGame")

document.addEventListener('DOMContentLoaded', (e) => {

    // Select all the cards
    const cards = document.querySelectorAll('.card-inner');
    const container = document.querySelectorAll('.container');
    let hasFlippedCard = false; // Keeps track of whether a card has been flipped
    let lockBoard = false; // Prevents further clicks when two cards are being checked
    let firstCard, secondCard; // Stores the first and second flipped cards

    // Function to handle card flip
    function flipCard() {
        // If the board is locked or the card clicked is the same as the first card, do nothing
        if (lockBoard || this === firstCard) return;

        // Add the flip class to the card
        this.classList.add('flip');

        // If no card has been flipped yet, mark this card as the first card
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        // If this is the second card being flipped, mark it as the second card
        secondCard = this;

        // Check if the two cards match
        checkForMatch();
    }

    // Function to check if the two cards match
    function checkForMatch() {
        // Compare the images of the two cards
        let isMatch = firstCard.querySelector('.back-face img').src === secondCard.querySelector('.back-face img').src;

        // If the cards match, disable them; otherwise, unflip them
        isMatch ? disableCards() : unflipCards();
    }

    // Function to disable the cards (remove event listeners)
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
        checkWin();
    }

    // Function to unflip the cards (remove the flip class)
    function unflipCards() {
        lockBoard = true; // Lock the board to prevent further clicks

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500); // Wait for 1.5 seconds before unflipping the cards
    }

    // Function to reset the board for the next pair of cards
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }


    function checkWin() {
        const allFlipped = [...cards].every(card => card.classList.contains('flip')); // Check if all cards are flipped
        if (allFlipped) {
            console.log('Winner!');
            clearInterval(timerInterval);
            win.style.display = "block"
            win.style.display = "flex"
            win.style.alignItems = "center"
            win.style.justifyContent = "center"
        }
    }



    (function shuffle() {
        container.forEach(card => {
            const randomPos = Math.floor(Math.random() * 12); // Generate a random position
            card.style.order = randomPos; // Apply the random position to the card
        });
    })();
    
    cards.forEach(card => card.addEventListener('click', flipCard)); // Add click event listener to each card

    restGame.addEventListener("click", function() {
        location.reload(); 
    })

    newGame.addEventListener("click", function() {
        location.reload();  
    })





    let win = document.querySelector("#win");
    let replayBtn = document.querySelector("#loseBtn");
    let lose = document.querySelector("pre");
    let finish = document.querySelector("#finish");
    
        let totalTime = 120 * 1000; // 10 minutes in milliseconds
        const interval = 10; // Update interval in milliseconds
    
        function updateTimer() {
            let minutes = Math.floor(totalTime / 60000);
            let seconds = Math.floor((totalTime % 60000) / 1000);
            let milliseconds = totalTime % 1000;
    
            // Format minutes, seconds, and milliseconds
            minutes = minutes < 1 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            milliseconds = milliseconds < 100 ? '0' + (milliseconds < 10 ? '0' + milliseconds : milliseconds) : milliseconds;
    
            // Display the timer
            document.getElementById('timer').textContent = `${minutes}:${seconds}:${milliseconds}`;
    
            // Decrement total time
            totalTime -= interval;
    
            // Stop the timer when it reaches 0
            if (totalTime < 0) {
                clearInterval(timerInterval);
                document.getElementById('timer').textContent = '00:00:000';
                lose.style.display = "block"
                lose.style.display = "flex"
                lose.style.alignItems = "center"
                lose.style.justifyContent = "center"
                lose.innerText = "You lose!"
                replayBtn.style.display = "block"
            }else if(totalTime < 10000){
                document.getElementById('timer').style.color = "red"
            }
        }
    
        // Update the timer every 10 milliseconds
        let timerInterval = setInterval(updateTimer, interval);
    
    
    
        replayBtn.addEventListener("click", function() {
            location.reload();
        })


        finish.addEventListener("click", function() {
            window.open("http://127.0.0.1:5500/Image%20Flip%20Game/first.html")
        })

});    

