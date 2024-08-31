let timer;
let isRunning = false;
let timeLeft; // Time left in seconds

// Sound effects
const startSound = new Audio('start.mp3');
const stopSound = new Audio('stop.mp3');
const resetSound = new Audio('reset.mp3');
const endSound = new Audio('end.mp3');
const tickSound = new Audio('tick.mp3'); // Add the tick sound

const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const endButton = document.getElementById('end');
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const messageDisplay = document.getElementById('message');

function updateDisplay() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    hoursDisplay.textContent = String(hours).padStart(2, '0');
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        // Calculate total time in seconds
        timeLeft = (parseInt(hoursInput.value) * 3600) + (parseInt(minutesInput.value) * 60) + parseInt(secondsInput.value);
        startSound.play(); // Play start sound
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
                tickSound.play(); // Play tick sound every second
            } else {
                clearInterval(timer);
                endSound.play(); // Play end sound when timer reaches zero
                messageDisplay.textContent = "Countdown Complete!";
                alert("Time's up!"); // Optional alert for better user feedback
            }
        }, 1000);
        isRunning = true;
    }
}

function stopTimer() {
    if (isRunning) {
        stopSound.play(); // Play stop sound
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    resetSound.play(); // Play reset sound
    stopTimer();
    timeLeft = (parseInt(hoursInput.value) * 3600) + (parseInt(minutesInput.value) * 60) + parseInt(secondsInput.value); // Reset to user-defined time
    updateDisplay();
    messageDisplay.textContent = ""; // Clear the message display
}

function endTimer() {
    endSound.play(); // Play end sound
    stopTimer();
    timeLeft = 0;
    updateDisplay();
    messageDisplay.textContent = ""; // Clear the message display
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
endButton.addEventListener('click', endTimer);

updateDisplay();


