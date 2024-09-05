const gameArea = document.getElementById("game-area");
const startButton = document.getElementById("start-game");
const resultDiv = document.getElementById("result");

let numbers = [];
let shuffledPositions = [];
let level = 1;
const totalLevels = 10;
let score = 0;
let startTime;

startButton.addEventListener("click", startGame);

function startGame() {
    level = 1;
    score = 0;
    resultDiv.textContent = "";
    nextLevel();
}

function nextLevel() {
    if (level > totalLevels) {
        endGame();
        return;
    }

    gameArea.innerHTML = ""; // Clear previous numbers
    numbers = Array.from({ length: 7 }, (_, i) => i + 1);
    shuffledPositions = shuffle(numbers);

    shuffledPositions.forEach((number) => {
        const numberBox = document.createElement("div");
        numberBox.classList.add("number-box");
        numberBox.textContent = number;
        gameArea.appendChild(numberBox);
    });

    setTimeout(hideNumbers, 2000); // Show numbers for 2 seconds
    startTime = Date.now();
}

function hideNumbers() {
    const boxes = document.querySelectorAll(".number-box");
    boxes.forEach((box) => {
        box.textContent = "";
    });

    gameArea.addEventListener("click", handleClick);
}

function handleClick(event) {
    if (event.target.classList.contains("number-box")) {
        const clickedNumber = shuffledPositions.shift();
        event.target.textContent = clickedNumber;

        if (shuffledPositions.length === 0) {
            level++;
            gameArea.removeEventListener("click", handleClick);
            setTimeout(nextLevel, 1000); // Proceed to the next level
        }
    }
}

function endGame() {
    const totalTime = (Date.now() - startTime) / 1000;
    resultDiv.textContent = `Game Over! Score: ${score}, Time: ${totalTime.toFixed(2)}s`;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
