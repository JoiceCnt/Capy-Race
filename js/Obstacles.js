class Obstacles {
  constructor(gameScreen, speed) {
    this.gameScreen = gameScreen;
    this.speed = speed || 3;
    this.bugSpeed = 3;
    this.top = -150;
    this.width = 140;
    this.height = 180; // obstacles width
    this.imagesArray = [
      "./image/fertilizer.jpg",
      "./image/sun.jpg",
      "./image/water.jpg",
    ];

    //syntax for random number between 0 and screen width
    this.left = Math.floor(
      Math.random() * (this.gameScreen.offsetWidth - this.width)
    );

    this.randomImageindex = Math.floor(Math.random() * this.imagesArray.length);

    //create img element
    this.element = document.createElement("img");
    const selectedImage = this.imagesArray[this.randomImageindex];
    this.element.src = selectedImage;

    // Definir o tipo com base no caminho da imagem
    if (selectedImage.includes("water")) {
      this.type = "water";
    } else if (selectedImage.includes("sun")) {
      this.type = "sun";
    } else if (selectedImage.includes("fertilizer")) {
      this.type = "fertilizer";
    }
    this.element.className = "obstacles";

    // makes the sun square
    if (this.imagesArray[this.randomImageindex].includes("sun")) {
      this.element.style.width = "120px"; // sun size
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
    this.top += this.speed;
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.top = this.top + "px";
  }
}
