class Obstacles {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = 200;
    this.top = 0;
    this.width = 150;
    this.height = 180;
    this.directionX = 0;

    //create img element
    this.element = document.createElement("img");
    this.element.src = "../image/fertilizer.jpg";
    this.element.className = "fertilizer";
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
