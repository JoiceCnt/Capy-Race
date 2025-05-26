class Bugs {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    //syntax for random number between 0 and 450
    this.left = Math.floor(Math.random() * (1300 - 0) + 0);
    this.top = -150;
    this.width = 125;
    this.height = 150;
    this.directionX = 0;

    //create img element
    this.element = document.createElement("img");
    this.element.src = "../image/ladybug.jpg";
    this.element.className = "bug";
    this.element.style.height = this.height + "px";
    this.element.style.width = this.width + "px";
    this.element.style.left = this.left + "px";
    this.element.style.top = this.top + "px";
    this.element.style.position = "absolute";

    this.gameScreen.appendChild(this.element);
  }
  move() {
    this.top = this.top + 5;

    this.updatePosition();
  }
  updatePosition() {
    this.element.style.top = this.top + "px";
  }
}
