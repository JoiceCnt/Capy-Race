class Player {
  constructor(gameScreen) {
    console.log("player file loaded");
    this.gameScreen = gameScreen;
    this.left = 605;
    this.top = 735;
    this.width = 180;
    this.height = 180;
    this.directionX = 0;

    this.element = document.createElement("img");
    this.element.src = "../image/capybara.jpg";
    this.element.className = "capybara";
    this.element.style.height = this.height + "px";
    this.element.style.width = this.width + "px";
    this.element.style.left = this.left + "px";
    this.element.style.top = this.top + "px";
    this.element.style.position = "absolute";
    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left = this.left + this.directionX;
    if (this.left < 0) {
      this.left = 0;
    }
    const maxRight = this.gameScreen.offsetWidth - this.width;
    if (this.left > maxRight) {
      this.left = maxRight;
    }
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.left = this.left + "px";
  }
  didCollide(obstacle) {
    const playRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();
    if (
      playRect.left < obstacleRect.right &&
      playRect.right > obstacleRect.left &&
      playRect.top < obstacleRect.bottom &&
      playRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
