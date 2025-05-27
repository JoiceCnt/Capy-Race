class Game {
  constructor() {
    this.startScreen = document.querySelector("#start-screen");
    this.startGameButton = document.querySelector("#start-button");
    this.gamePage = document.querySelector("#Game-Page");
    this.gameScreen = document.querySelector("#game-screen");
    this.infoContainer = document.querySelector("#info-container");
    this.ProgressBarElement = document.querySelector("#progress-bar");
    this.plantlevel = document.querySelector("#plant-level");
    this.scoreboard = document.querySelector("#score");
    this.livesElement = document.querySelector("#lives"); // lives number
    this.player = new Player(this.gameScreen); // adds capibara to the gamescreen
    this.height = 900;
    this.width = 1710;
    this.top = 0;
    this.obstacles = [new Obstacles(this.gameScreen)];
    this.bugs = [new Bugs(this.gameScreen)];
    this.score = 5;
    this.progressBarValue = 100;
    this.lives = 5;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.obstaclesInterval = null;
    this.frames = 0;
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
    // add one to the frames
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
      this.gameOver(false); // player lost
    }
    this.frames++;

    this.update();
  }
  update() {
    // console.log("test");
    this.player.move();
    //console.log(this.obstacles);
    // adds a new obstacle every 40 frames
    if (this.frames % 150 === 0 && this.obstacles.length < 10) {
      this.obstacles.push(new Obstacles(this.gameScreen));
    }
    // adds a new bug every 30 frames
    if (this.frames % 200 === 0 && this.bugs.length < 15) {
      this.bugs.push(new Bugs(this.gameScreen));
    }

    //moving the obstacles array
    for (let i = 0; i < this.obstacles.length; i++) {
      const currentObstacles = this.obstacles[i];
      currentObstacles.move();

      // check if the obstacles hits the player
      if (this.player.didCollide(currentObstacles)) {
        this.score++;
        this.scoreboard.innerText = this.score;

        console.log(this.score);
        //verify if the player wins
        if (this.score >= 10) {
          this.gameOver(true);
          return;
        }
        this.obstacles.splice(i, 1);
        //remove from the DOM
        currentObstacles.element.remove();
        i--;
      }

      //removing obstacles from aray and the DOM so they do not move off the page
      if (currentObstacles.top > 900) {
        //remove from array
        this.obstacles.splice(i, 1);
        //remove from the DOM
        currentObstacles.element.remove();
        i--;
      }
    }
    // moving bugs
    for (let i = 0; i < this.bugs.length; i++) {
      const currentBug = this.bugs[i];
      currentBug.move();

      //collision bugs
      if (this.player.didCollide(currentBug)) {
        this.bugs.splice(i, 1);
        currentBug.element.remove();
        this.lives--;
        this.livesElement.innerText = this.lives;
        i--;
        if (this.lives === 0) {
          this.gameIsOver = true;
        }
      }
    }
  }
  gameOver(won) {
    this.gameScreen.style.display = "none";

    // link html end screens
    const loserScreen = document.getElementById("loser-screen");
    const winnerScreen = document.getElementById("winner-screen");

    // hide both screens first
    loserScreen.classList.add("hidden");
    winnerScreen.classList.add("hidden");

    // shows the correct screen accounding to the result
    if (won) {
      winnerScreen.classList.remove("hidden");
      winnerScreen.style.display = "flex";
    } else {
      loserScreen.classList.remove("hidden");
      loserScreen.style.display = "flex";
    }

    // stop the game
    clearInterval(this.gameIntervalId);
    clearInterval(this.obstaclesInterval);

    // restart button
    document.querySelectorAll(".restart-button").forEach((button) => {
      button.addEventListener("click", () => {
        location.reload();
      });
    });
  }
}
