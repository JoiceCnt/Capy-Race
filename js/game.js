class Game {
  constructor() {
    this.startScreen = document.querySelector("#start-screen");
    this.startGameButton = document.querySelector("#Start-button");
    this.gamePage = document.querySelector("#Game-Page");
    this.gameScreen = document.querySelector("#game-screen");
    this.obstacles = document.querySelector(
      ".water,.sun, .fertilizer, .ladybug"
    );
    this.infoContainer = document.querySelector("#info-container");
    this.ProgressBar = document.querySelector("#progress-bar");
    this.plantlevel = document.querySelector("#plant-level");
    this.gameOverScreen = document.querySelector("#gameover-screen");
    this.restartGameButton = document.querySelector("#restart-button");
    this.player = new Player(this.gameScreen); // adds capibara to the gamescreen
    this.height = 900;
    this.width = 1710;
    this.top = 0;
    this.obstacles = new Obstacles(this.gameScreen);
    this.level = 5;
    this.ProgressBar = 100;
    this.lives = 5;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.obstaclesInterval = null;
  }
  start() {
    this.gameScreen.style.height = this.height + "px";
    this.gameScreen.style.width = this.width + "px";
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gamePage.style.display = "flex";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, Math.round(1000 / 60));
  }
  gameLoop() {
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
    this.update();
  }
  update() {
    console.log("test");
    this.player.move();
  }
}
