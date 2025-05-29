//variables
const startGameButton = document.querySelector("#start-button");
const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const infoContainer = document.querySelector("#info-container");
const progressBar = document.querySelector("#progress-bar");
const plantLevel = document.querySelector("#plant-level");
const gameOver = document.querySelector("#gameover-screen");
const capybara = document.querySelector("#capybara");
const restartButtons = document.querySelectorAll(".restart-button");

restartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.reload();
  });
});
const restartGameButton = document.querySelector("#restart-button");
let ourGame;

//event Listeners
startGameButton.addEventListener("click", () => {
  startGame();
});

restartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.reload();
  });
});

// functions to start the game
function startGame() {
  console.log("starting the game");
  ourGame = new Game();
  ourGame.start();
}

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    console.log("right pressed");
    ourGame.player.directionX = 5;
  }

  if (event.code === "ArrowLeft") {
    console.log("left pressed");
    ourGame.player.directionX = -5;
  }

  window.addEventListener("keyup", (event) => {
    if (event.code === "ArrowRight") {
      console.log("right pressed");
      ourGame.player.directionX = 0;
    }

    if (event.code === "ArrowLeft") {
      console.log("left pressed");
      ourGame.player.directionX = 0;
    }
  });
});
