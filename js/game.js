class Game {
  constructor() {
    this.startScreen = document.querySelector("#start-screen");
    this.startGameButton = document.querySelector("#start-button");
    this.gamePage = document.querySelector("#Game-Page");
    this.gameScreen = document.querySelector("#game-screen");
    this.ProgressBarElement = document.querySelector("#progress-bar");
    this.plantlevel = document.querySelector("#plant-level");
    this.scoreboard = document.querySelector("#score");
    this.livesElement = document.querySelector("#lives"); // lives number

    //game page configuration
    this.gamePage.style.display = "flex";
    this.gamePage.style.flexDirection = "row";
    this.gamePage.style.width = "100vw";
    this.gamePage.style.height = "100vh";
    // game screen configuration
    this.gameScreen.style.width = "79vw";
    this.gameScreen.style.height = "98vh";
    this.gameScreen.style.overflow = "hidden";
    this.gameScreen.style.position = "relative";

    this.top = 0;
    this.obstaclesSpeed = 8;
    this.obstacles = [new Obstacles(this.gameScreen)];
    this.bugs = [new Bugs(this.gameScreen)];
    this.score = 0;
    this.lives = 5;
    this.isPaused = false;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.obstaclesInterval = null;

    this.frames = 0;
    this.waterPoints = 0;
    this.sunPoints = 0;
    this.fertilizerPoints = 0;
    //bring levels from html
    this.level = 0;
    this.levelElement = document.getElementById("score");
    this.levelElement.innerText = this.level;
    // progress bar filling (bug)
    this.progressBarContainer = document.createElement("div");
    this.progressBarContainer.style.width = "80%";
    this.progressBarContainer.style.height = "30px";
    this.progressBarContainer.style.border = "2px solid darkred";
    this.progressBarContainer.style.backgroundColor = "#fff";
    this.progressBarContainer.style.margin = "500px 0";
    this.progressBarContainer.style.borderRadius = "15px";
    this.progressBarContainer.style.overflow = "hidden";

    this.progressFill = document.createElement("div");
    this.progressFill.style.height = "100%";
    this.progressFill.style.width = "0%"; // starts empty
    this.progressFill.style.backgroundColor = "darkred";
    this.progressFill.style.transition = "width 0.3s ease-in-out";

    this.progressBarContainer.appendChild(this.progressFill);

    // creating icon for the obstacles  progress bar
    this.progressWrapper = document.createElement("div");
    this.progressWrapper.style.display = "flex";
    this.progressWrapper.style.alignItems = "center";
    this.progressWrapper.style.alignItems = "center";
    this.progressWrapper.style.flexDirection = "row";
    this.progressWrapper.style.gap = "10px";
    this.progressWrapper.style.width = "80%";
    this.progressWrapper.style.height = "30px";
    this.progressWrapper.style.margin = "5px 0";

    //create icon  BUG img
    this.bugIcon = document.createElement("img");
    this.bugIcon.src = "./image/ladybug.jpg";
    this.bugIcon.alt = "bug Icon";
    this.bugIcon.style.width = "40px";
    this.bugIcon.style.height = "40px";
    this.bugIcon.style.objectFit = "contain";
    this.bugIcon.style.marginLeft = "5px";

    // add BUG img icon to the container
    this.progressWrapper.appendChild(this.bugIcon);
    this.progressWrapper.appendChild(this.progressBarContainer);

    //adds the bug container to the sidebar
    document.getElementById("sideBar").appendChild(this.progressWrapper);

    //add img to obstacles bar
    this.waterBar = this.createProgressBarWithIcon("./image/water.jpg");
    this.sunBar = this.createProgressBarWithIcon("./image/sun.jpg");
    this.fertilizerBar = this.createProgressBarWithIcon(
      "./image/fertilizer.jpg"
    );

    this.player = new Player(this.gameScreen); // adds capibara to the gamescreen

    const sideBar = document.getElementById("sideBar");
    sideBar.style.width = "20vw";
    sideBar.style.height = "98vh";
    sideBar.style.display = "flex";
    sideBar.style.flexDirection = "column";

    const spacer = document.createElement("div");
    spacer.style.flexGrow = "1";
    sideBar.appendChild(spacer); // moves the tree to the bottom

    this.treeImage = document.createElement("img");
    this.treeImage.src = "./image/plant0.jpg";
    this.treeImage.style.width = "180px";
    this.treeImage.style.transform = "scale(1.2)";
    this.treeImage.style.objectFit = "contain";

    sideBar.appendChild(this.treeImage);

    this.stagesimages = [
      "./image/plant0.jpg",
      "./image/plant1.png",
      "./image/plant2.png",
      "./image/plant3.jpg",
      "./image/plant4.png",
      "./image/plant5.jpg",
      "./image/plant6.jpg",
    ];
  }
  // creat progress bar for obstacles icons
  createProgressBarWithIcon(iconPath) {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "10px";
    wrapper.style.margin = "20px 0";
    wrapper.style.width = "80%";

    const icon = document.createElement("img");
    icon.src = iconPath;
    icon.style.width = "40px";
    icon.style.height = "40px";
    icon.style.objectFit = "contain";

    //stylying obstacles img in the progress bar
    const barContainer = document.createElement("div");
    barContainer.style.width = "80%";
    barContainer.style.height = "30px";
    barContainer.style.border = "2px solid #444";
    barContainer.style.backgroundColor = "#eee";
    barContainer.style.borderRadius = "15px";
    barContainer.style.overflow = "hidden";
    // filling progress bar
    const fill = document.createElement("div");
    fill.style.height = "100%";
    fill.style.width = "0%";
    fill.style.backgroundColor = "#228B22";
    fill.style.transition = "width 0.3s ease-in-out";

    barContainer.appendChild(fill);
    wrapper.appendChild(icon);
    wrapper.appendChild(barContainer);
    document.getElementById("sideBar").appendChild(wrapper);

    return fill;
  }

  // creaating progress bar
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
      return;
    }
    if (this.isPaused) return; // pause the game with space bar
    this.frames++;
    this.update();
  }
  update() {
    // console.log("test");

    this.player.move();
    //console.log(this.obstacles);
    // adds a new obstacle every 40 frames
    if (this.frames % 60 === 0) {
      //&& this.obstacles.length < 10
      this.obstacles.push(new Obstacles(this.gameScreen, this.obstaclesSpeed));
    }
    // adds a new bug every 30 frames
    if (this.frames % 200 === 0) {
      // && this.bugs.length < 15
      this.bugs.push(new Bugs(this.gameScreen, this.bugSpeed));
    }

    //moving the obstacles array
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const currentObstacles = this.obstacles[i];
      currentObstacles.move(); // make the obstacles fall

      // check if the obstacles hits the player
      if (this.player.didCollide(currentObstacles)) {
        this.score++;
        if (currentObstacles.type === "water" && this.waterPoints < 5) {
          this.waterPoints++;
          this.waterBar.style.width = `${(this.waterPoints / 5) * 100}%`;
        } else if (currentObstacles.type === "sun" && this.sunPoints < 5) {
          this.sunPoints++;
          this.sunBar.style.width = `${(this.sunPoints / 5) * 100}%`;
        } else if (
          currentObstacles.type === "fertilizer" &&
          this.fertilizerPoints < 5
        ) {
          this.fertilizerPoints++;
          this.fertilizerBar.style.width = `${
            (this.fertilizerPoints / 5) * 100
          }%`;
        }
        if (
          this.waterPoints >= 5 &&
          this.sunPoints >= 5 &&
          this.fertilizerPoints >= 5
        ) {
          // Só sobe se for menor que 6
          if (this.level < 6) {
            this.level++;
            this.levelElement.innerText = this.level;

            // Atualiza a planta
            this.updateEvolutionStage();

            // Reseta os pontos
            this.waterPoints = 0;
            this.sunPoints = 0;
            this.fertilizerPoints = 0;

            // Zera as barras visuais
            this.waterBar.style.width = "0%";
            this.sunBar.style.width = "0%";
            this.fertilizerBar.style.width = "0%";
          }
        }

        const totalPoints =
          this.waterPoints + this.sunPoints + this.fertilizerPoints;

        if (
          this.waterPoints >= 5 &&
          this.sunPoints >= 5 &&
          this.fertilizerPoints >= 5
        ) {
          // upgade levels
          this.updateEvolutionStage();
          this.scoreboard.innerText = `Level: ${Math.min(
            Math.floor(this.score / 5),
            this.stagesimages.length - 1
          )}`;

          // Restart points
          this.waterPoints = 0;
          this.sunPoints = 0;
          this.fertilizerPoints = 0;

          // restart procress bar
          this.waterBar.style.width = "0%";
          this.sunBar.style.width = "0%";
          this.fertilizerBar.style.width = "0%";
        }

        console.log(this.score);

        this.obstacles.splice(i, 1);
        currentObstacles.element.remove();
        i--;
        //verify if the player wins
        if (this.level >= this.stagesimages.length - 1) {
          this.gameOver(true);
          return;
        }

        //remove from the DOM
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
        const progressPercent = ((5 - this.lives) / 5) * 100;
        this.progressFill.style.width = `${progressPercent}%`; // adds tp the progress bar
        i--;
        if (this.lives === 0) {
          this.gameIsOver = true;
        }
      }
    }
  }
  gameOver(won) {
    this.gameScreen.style.display = "none";
    console.log("Game over chamado, player:", this.player);
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

    this.treeImage.remove();

    // restart button
    document.querySelectorAll(".restart-button").forEach((button) => {
      button.addEventListener("click", () => {
        location.reload();
      });
    });
  }
  updateEvolutionStage() {
    const stage = Math.min(this.level, this.stagesimages.length - 1);
    this.treeImage.src = this.stagesimages[stage];
  }
}
