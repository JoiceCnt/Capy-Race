//variables
const startGameButton = document.querySelector("#start-button");
const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const infoContainer = document.querySelector("#info-container");
const progressBar = document.querySelector("#progress-bar");
const plantLevel = document.querySelector("#plant-level");
const gameOver = document.querySelector("#gameover-screen");
const capybara = document.querySelector("#capybara");
let ourGame;

//event Listeners
startGameButton.addEventListener("click", () => {
  startGame();
});

// functions
function startGame() {
  console.log("starting the game");
  ourGame = new Game();
  ourGame.start();
}
window.addEventListener("keydown", (event) => {
  if (ourGame && ourGame.player) {
    if (event.key === "ArrowLeft") {
      ourGame.player.directionX = -5;
    } else if (event.key === "ArrowRight") {
      ourGame.player.directionX = 5;
    }
  }
});
window.addEventListener("keyup", (event) => {
  if (ourGame && ourGame.player) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      ourGame.player.directionX = 0;
    }
  }
});
