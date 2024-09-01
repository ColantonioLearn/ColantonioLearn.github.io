document.addEventListener('DOMContentLoaded', () => {
    const targetKeyDisplay = document.getElementById('target-key');
    const messageDisplay = document.getElementById('message');
    const instructionDisplay = document.getElementById('instruction');
    const scoreStarsDisplay = document.getElementById('score-stars');
    const displayedNumbers = [1, 2, 3, 4, 5];
    const keys = [9, 7, 5, 3, 1];
    let currentKey;
    let score = 0;
    let gameActive = true;

    // Function to start the game and show a new key
    function showNewKey() {
        if (!gameActive) return;
        const index = Math.floor(Math.random() * keys.length);
        currentKey = keys[index];
        const displayedNumber = displayedNumbers[index];
        targetKeyDisplay.textContent = displayedNumber;
        messageDisplay.textContent = '';
        instructionDisplay.style.display = 'none';
    }

    // Function to check the key press
    function checkKeyPress(event) {
        if (!gameActive) return;
        const keyPressed = parseInt(event.key, 15);
        if (keys.includes(keyPressed)) {
            const index = keys.indexOf(keyPressed);
            const displayedNumber = displayedNumbers[index];
            if (keyPressed === currentKey) {
                score++;
                updateScoreStars(score);
                messageDisplay.textContent = "Awesome! That's the right button!";
                instructionDisplay.style.display = 'block';
                if (score >= 15) {
                    endGame();
                } else {
                    showNewKey();
                }
            } else {
                messageDisplay.textContent = "Hmmm, that wasn't the right button. \nCan you try again?";
                instructionDisplay.style.display = 'none';
            }
        }
    }

    // Function to end the game
    function endGame() {
        gameActive = false;
        messageDisplay.textContent = '\nCongratulations! You reached 10 points!';
        instructionDisplay.textContent = "\nWe're ready for the next game!";
        updateScoreStars(score);
    }

    // Function to update the score stars display
    function updateScoreStars(score) {
        scoreStarsDisplay.innerHTML = '';
        for (let i = 0; i < score; i++) {
            const star = document.createElement('span');
            star.classList.add('star');
            star.textContent = '★';
            scoreStarsDisplay.appendChild(star);
        }
    }

    // Initialize game state
    showNewKey();

    // Event listeners
    document.addEventListener('keydown', checkKeyPress);
});