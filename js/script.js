// Variables
const startGameButton = document.querySelector("#start-button");
const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const infoContainer = document.querySelector("#info-container");
const progressBar = document.querySelector("#progress-bar");
const plantLevel = document.querySelector("#plant-level");
const gameOver = document.querySelector("#gameover-screen");
const capybara = document.querySelector("#capybara");
const restartButtons = document.querySelectorAll(".restart-button");
const restartGameButton = document.querySelector("#restart-button");

let ourGame;

// Start game
startGameButton.addEventListener("click", () => {
  startGame(); // start game
});

// Restart buttons
restartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.reload();
  });
});

// Start game logic
function startGame() {
  console.log("Starting the game");
  ourGame = new Game();
  ourGame.start();
}

//  moving and stop
window.addEventListener("keydown", (event) => {
  if (!ourGame) return;

  // Toggle pause
  if (event.code === "Space") {
    ourGame.isPaused = !ourGame.isPaused;
    console.log("Pausado:", ourGame.isPaused);
    if (ourGame.pauseOverlay) {
      ourGame.pauseOverlay.style.display = ourGame.isPaused ? "block" : "none";
    }
    return; // stop moving obstacles while the game is paused
  }

  // move when not paused
  if (ourGame.isPaused) return;

  if (event.code === "ArrowRight") {
    ourGame.player.directionX = ourGame.player.speed;
  }

  if (event.code === "ArrowLeft") {
    ourGame.player.directionX = -ourGame.player.speed;
  }
});

// Keyup: parar movimento
window.addEventListener("keyup", (event) => {
  if (!ourGame) return;

  if (["ArrowLeft", "ArrowRight"].includes(event.code)) {
    ourGame.player.directionX = 0;
  }
});
