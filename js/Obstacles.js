class Obstacles {
  constructor(gameScreen, speed) {
    this.gameScreen = gameScreen;
    this.speed = speed || 3;
    this.top = -150;
    this.width = 125;
    this.height = 150;
    this.directionX = 0;
    this.imagesArray = [
      "../image/fertilizer.jpg",
      "../image/sun.jpg",
      "../image/water.jpg",
    ];

    //syntax for random number between 0 and screen width
    this.left = Math.floor(
      Math.random() * (this.gameScreen.offsetWidth - this.width)
    );

    this.randomImageindex = Math.floor(Math.random() * this.imagesArray.length);

    //create img element
    this.element = document.createElement("img");
    this.element.src = this.imagesArray[this.randomImageindex];
    this.element.className = "obstacles";

    // makes the sun square
    if (this.imagesArray[this.randomImageindex].includes("sun")) {
      this.element.style.width = "120px";
      this.element.style.height = "120px";
    } else {
      this.element.style.width = this.width + "px";
      this.element.style.height = this.height + "px";
    }

    this.element.style.left = this.left + "px";
    this.element.style.top = this.top + "px";
    this.element.style.position = "absolute";

    this.gameScreen.appendChild(this.element);
  }
  move() {
    this.top = this.top + 5;
    this.top += this.speed;
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.top = this.top + "px";
  }
}
