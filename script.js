const gameContainer = document.getElementById("game");
const capybaraElement = document.getElementById("capybara");
const levelDisplay = document.getElementById("level");
const scoreWaterBar = document.getElementById("bar-water");
const scoreSunBar = document.getElementById("bar-sun");
const scoreFertilizerBar = document.getElementById("bar-fertilizer");
const scoreLadybugBar = document.getElementById("bar-ladybug");
const fallingContainer = document.getElementById("falling-objects");

const fallingWater = document.getElementsByClassName("water");
const fallingSun = document.getElementsByClassName("sun");
const fallingFertilizer = document.getElementsByClassName("fertilizer");
const fallingLadybug = document.getElementsByClassName("ladybug");

const plant0Element = document.querySelector(".plant-0");
const plant1Element = document.querySelector(".plant-1");
const plant2Element = document.querySelector(".plant-2");
const plant3Element = document.querySelector(".plant-3");
const plant4Element = document.querySelector(".plant-4");
const plant5Element = document.querySelector(".plant-5");
const plant6Element = document.querySelector(".plant-6");
const plant7Element = document.querySelector(".plant-7");

//capy moves y and x
let capybaraX = 0;
let capybaraY = 0;

let gameRect;
let capybaraRect;

const moveSpeed = 5; //adjust the velocity of movements
function UpdateCapybaraPosition(){
    capybaraElement.style.left = `${capybaraX}px`;
    capybaraElement.style.bottom = `${capybaraY}px`
}

window.addEventListener("keydown", (event) =>{
 const gameRect = gameContainer.getBoundingClientRect(); //used to set position and dimentions of an objct
capybaraRect = capybaraElement.getBoundingClientRect();
 const screenWidth = window.innerWidth; 
 const capybaraWidth = capybaraRect.width;
switch (event.key) {
        case "ArrowLeft":
            capybaraX -= moveSpeed;
            break;
        case "ArrowRight":
            capybaraX += moveSpeed;
            break;
        case "ArrowUp":
            capybaraY += moveSpeed;
            break;
        case "ArrownDown":
            capybaraY += moveSpeed;
            break;       
} 

//limite capybara moves 80% of the screen on the right size
const leftBoundary = screenWidth *0.2;
const rightBoundary = screenWidth *0.8;
if (capybaraX < leftBoundary){
    capybaraX = leftBoundary;
}
if(capybaraX + capybaraRect.width > rightBoundary){
   capybaraX = rightBoundary - capybaraRect.width;
}

if (capybaraX < 0) {
    capybaraX = 0;
    }  
if (capybaraY > gameRect.height - capybaraRect.height){
    capybaraY = gameRect.height - capybaraRect.height - capybaraWidth;
}  
UpdateCapybaraPosition();        

});

function createFallingElement (type){
    const element = document.createElement("img");
        element.src`./image/fertilizer${fertilizer}.jpg`; 
        element.classList.add(fertilizer);
        element.style.top= "0px";
            
}
const gameWidth = gameContainer.offsetWidth;
const randomX = Math.ramdom()* (gameWidth -50);
element.style.left `${randomX}px`;

fallingContainer.appendChild (element);

let posY= 0;
const fallIntervall= setInterval(()=>{
    posY += 2;
    element.style.top = `${posY}px`;
if (posY > gameContainer.offsetHeight) {
       clearInterval(fallInterval);
      element.remove(); 
}
},16);  
setInterval(() => {
    const types = ["water", "sun", "fertilizer", "ladybug"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    createFallingElement(randomType);
}, 1200);