let canvas;
let ctx; //ctx = context
let character_x = 100; // Var for X-Achse
let character_y = 250; // Var for Y-Achse
let isMovingRight = false; //boolean var
let isMovingLeft = false;
let bg_elements = 0;
let lastJumpStarted = 0;
let currentCharacterImage = 'img/charakter_1.png';
let characterGraphicsRight = ['img/charakter_1.png', 'img/charakter_2.png', 'img/charakter_3.png',
  'img/charakter_4.png']
let characterGraphicsLeft = ['img/charakter_left_1.png', 'img/charakter_left_2.png', 'img/charakter_left_3.png',
  'img/charakter_left_4.png'];
let characterGraphicsIndex = 0;
let cloudOffset = 0;// cloud movement
let chickens = [];


//-------------------Game config--------------

let JUMP_TIME = 300; // ms / Konstante immer GROß schreiben
let GAME_SPEED = 6;
let AUDIO_RUNNING = new Audio('audio/run.mp3');
let AUDIO_JUMP = new Audio('audio/jump.mp3');



function init() {
  canvas = document.getElementById('canvas'); // Html Tag
  ctx = canvas.getContext("2d"); // Zone for painting
  createChickenList();
  checkForRunning();
  draw();
  calculateCloudOffset();
  listenForKeys();
  calculateChickenPosition();
  checkForCollision();
}

function checkForCollision() {
  setInterval(function () {
    for (let i = 0; i < chickens.length; i++) {
      let chicken = chickens[i];

      if((chicken.position_x - 40) < character_x && (chicken.position_x + 40) > character_x) {
        alert('Kollision!!!');
      }
    }
  }, 100);
  
}

function calculateChickenPosition() {

  setInterval(function () {
    for (let i = 0; i < chickens.length; i++) {
      let chicken = chickens[i];
      chicken.position_x = chicken.position_x - chicken.speed;
    }
  }, 50);
}
function createChickenList() {
  chickens = [
    createChicken(1, 200),
    createChicken(2, 400),
    createChicken(1, 700),
  ];
}

function calculateCloudOffset() {
  setInterval(function () {
    cloudOffset = cloudOffset + 0.25;
  }, 50);
}

function checkForRunning() {
  setInterval(function () {
    if (isMovingRight) {
      AUDIO_RUNNING.play();
      let index = characterGraphicsIndex % characterGraphicsRight.length;
      currentCharacterImage = characterGraphicsRight[index];
      characterGraphicsIndex = characterGraphicsIndex + 1;
    }
    if (isMovingLeft) {
      AUDIO_RUNNING.play();
      let index = characterGraphicsIndex % characterGraphicsLeft.length;
      currentCharacterImage = characterGraphicsLeft[index];
      characterGraphicsIndex = characterGraphicsIndex + 1;
    }
    if (!isMovingRight && !isMovingLeft) {
      AUDIO_RUNNING.pause();
    }

  }, 100);// Image change every 100ms
}


function draw() {

  drawBackground();
  updateCharacter();
  drawChicken();
  requestAnimationFrame(draw);// drawing often as possible

}
function drawChicken() {
  for (let i = 0; i < chickens.length; i = i + 1) {
    let chicken = chickens[i];
    addBackgoundObject(chicken.img, chicken.position_x, chicken.position_y, chicken.scale, 1);

  }
}

function createChicken(type, position_x) {
  return {
    "img": "img/chicken" + type + ".png",
    "position_x": position_x,
    "position_y": 325,
    "scale": 0.6,
    "speed": (Math.random() * 5)
  };
}

function updateCharacter() {
  let base_image = new Image();// Variable
  base_image.src = currentCharacterImage;//Source

  let timePassedSinceJump = new Date().getTime() - lastJumpStarted;//currentTime - Start Time

  if (timePassedSinceJump < JUMP_TIME) {
    character_y = character_y - 10;
  } else
    //Check falling

    if (character_y < 250) {
      character_y = character_y + 10;

    }

  if (base_image.complete) { //Image load
    ctx.drawImage(base_image, character_x, character_y, base_image.width * 0.35, base_image.height * 0.35); // params of the Image
  };

}

function drawBackground() {


  ctx.fillStyle = "white"; //Color
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  /*ctx.fillRect(100, 100, 200,200); //Form wird hinzugefügt, hier Viereck, Nummerierung koordinaten X-Achse,koordinaten Y-Achse,breite,höhe!*/

  drawGround();

  //Draw Clouds
  addBackgoundObject('img/cloud1.png', 100 - cloudOffset, 20, 0.8, 1);
  addBackgoundObject('img/cloud2.png', 500 - cloudOffset, 20, 0.6, 1);

  addBackgoundObject('img/cloud1.png', 800 - cloudOffset, 20, 0.8, 1);
  addBackgoundObject('img/cloud2.png', 1300 - cloudOffset, 20, 0.6, 1);

}

function drawGround() {


  if (isMovingRight) {
    bg_elements = bg_elements - GAME_SPEED;
  }

  if (isMovingLeft) {
    bg_elements = bg_elements + GAME_SPEED;
  }


  addBackgoundObject('img/bg_elem_1.png', 0, 195, 0.6, 0.6);// var sourceImg, X-Achse, Y-Achse,ScaleImg,
  addBackgoundObject('img/bg_elem_2.png', 450, 120, 0.6,);
  addBackgoundObject('img/bg_elem_1.png', 700, 255, 0.4, 0.8);
  addBackgoundObject('img/bg_elem_2.png', 1100, 260, 0.4);

  addBackgoundObject('img/bg_elem_1.png', 1200, 195, 0.6,);
  addBackgoundObject('img/bg_elem_2.png', 1450, 120, 0.6, 0.8);
  addBackgoundObject('img/bg_elem_1.png', 1700, 255, 0.4,);
  addBackgoundObject('img/bg_elem_2.png', 2000, 260, 0.4, 0.6);

  //Draw ground
  ctx.fillStyle = "#FFE699";
  ctx.fillRect(0, 375, canvas.width, canvas.height - 375);

  for (let i = 0; i < 10; i = i + 1) {
    addBackgoundObject('img/sand.png', i * canvas.width, 375, 0.360, 0.5);
  }

}

function addBackgoundObject(src, offsetX, offsetY, scale, opacity) {//opacity is an optional var!

  if (opacity != undefined) {
    ctx.globalAlpha = opacity;
  }

  //add Kaktus
  let base_image = new Image();// Variable
  base_image.src = src;// Source
  if (base_image.complete) { //Image will painted
    ctx.drawImage(base_image, offsetX + bg_elements, offsetY, base_image.width * scale, base_image.height * scale); // Params of the Image
  }

  ctx.globalAlpha = 1;

}

function listenForKeys() { //ArrowRight push
  document.addEventListener("keydown", e => {
    const k = e.key;

    if (k == 'ArrowRight') {
      isMovingRight = true;
      // character_x = character_x + 5; 
    }

    if (k == 'ArrowLeft') {
      isMovingLeft = true;
      // character_x = character_x - 5; 
    }
    let timePassedSinceJump = new Date().getTime() - lastJumpStarted;

    if (e.code == 'Space' && timePassedSinceJump > JUMP_TIME * 2) {
      AUDIO_JUMP.play();
      lastJumpStarted = new Date().getTime();
    }

  });

  document.addEventListener("keyup", e => { //Key less
    const k = e.key;
    console.log(k == 'ArrowRight')

    if (k == 'ArrowRight') {
      isMovingRight = false;
      // character_x = character_x + 5;
    }

    if (k == 'ArrowLeft') {
      isMovingLeft = false;
      // character_x = character_x - 5;
    }
    //  if (e.code == 'Space') {
    //   isJumping = false;
    //  }

  });
}