const END_OF_WORLD = new Date('2025-01-07T08:00:00');
const timerDiv = document.getElementById('timer');

function updateTimer() {
    const now = new Date();
    const timeLeft = END_OF_WORLD - now;

    if (timeLeft <= 0) {
      timerDiv.textContent = "The world has ended! (Or you've missed the deadline.)";
      return;
    }

    const seconds = Math.floor(timeLeft / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const timeString = `${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`;
    timerDiv.textContent = timeString;
}

setInterval(updateTimer, 1000); // Update every second
updateTimer();