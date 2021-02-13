let canvas;
let ctx; //ctx = context
let character_x = 100; // Var for X-Achse
let character_y = 250; // Var for Y-Achse
let character_energy = 100;
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
let placedBottles = [500, 1000, 1700, 2500, 3000, 3200, 3700, 4200, 4500];
let collectedBottles = 0;
let bottleThrowTime = 0;      // Start value is undefined
let thrownBottle_x = 0;
let thrownBottle_y = 0;

//-------------------Game config--------------

let JUMP_TIME = 300; // ms / Konstante immer GROß schreiben
let GAME_SPEED = 6;
let AUDIO_RUNNING = new Audio('audio/run.mp3');
let AUDIO_JUMP = new Audio('audio/jump.mp3');
let AUDIO_BOTTLE = new Audio('audio/bottle.mp3');


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

    // Check chicken
    for (let i = 0; i < chickens.length; i++) {
      let chicken = chickens[i];
      let chicken_x = chicken.position_x + bg_elements;

      if ((chicken_x - 40) < character_x && (chicken_x + 40) > character_x) {
        if (character_y > 210) {
          character_energy--;
        }

      }
    }
    // Check bottle

    for (let i = 0; i < placedBottles.length; i++) {
      let bottle_x = placedBottles[i] + bg_elements;// bottle position + shift background

      if ((bottle_x - 40) < character_x && (bottle_x + 40) > character_x) {
        if (character_y > 210) {
          placedBottles.splice(i, 1);
          AUDIO_BOTTLE.play();
          collectedBottles++;
        }
      }
    }

    //Check Big boss
    if (thrownBottle_x > 1000 + bg_elements - 100 && thrownBottle_x < 1000 + bg_elements + 100) {
      
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
    createChicken(1, 700),
    createChicken(2, 1400),
    createChicken(1, 1800),
    createChicken(2, 2500),
    createChicken(1, 3000),
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
  drawBottles();
  requestAnimationFrame(draw);// drawing often as possible
  drawEnergyBar();
  drawInformation();
  drawThrowBottle();
  drawBigBoss();

}
function drawBigBoss() {
  let chicken_x = 5000;
  addBackgoundObject('img/chicken_big.png', chicken_x, 98, 0.45, 1);
  
}
function drawThrowBottle() {
  if (bottleThrowTime) {
    let timePassed = new Date().getTime() - bottleThrowTime;
    let gravity = Math.pow(9.81, timePassed / 300);
    let thrownBottle_x = 125 + (timePassed * 0.7);
    let thrownBottle_y = 300 - (timePassed * 0.5 - gravity);

    let base_image = new Image();
    base_image.src = 'img/tabasco.png';
    if (base_image.complete) {
      ctx.drawImage(base_image, thrownBottle_x, thrownBottle_y, base_image.width * 0.5, base_image.height * 0.5);
    }
  }
}


function drawInformation() {

  let base_image = new Image();// Variable
  base_image.src = 'img/tabasco.png';// Source
  if (base_image.complete) { //Image will painted
    ctx.drawImage(base_image, 0, 0, base_image.width * 0.5, base_image.height * 0.5); // Params of the Image
  }

  ctx.font = '30px Bradley Hand ITC';
  ctx.fillText('x' + collectedBottles, 50, 30);
}

function drawEnergyBar() {
  ctx.globalAlpha = 0.5;//Opacity
  ctx.fillStyle = "blue"; //Color
  ctx.fillRect(500, 15, 2 * character_energy, 30);
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = "black"; //Color
  ctx.fillRect(495, 10, 210, 40);
  ctx.globalAlpha = 1;

}
function drawBottles() {
  for (let i = 0; i < placedBottles.length; i++) {
    let bottle_x = placedBottles[i];
    addBackgoundObject('img/tabasco.png', bottle_x, 318, 0.7, 1);
  }

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
  addBackgoundObject('img/cloud1.png', 1800 - cloudOffset, 20, 0.8, 1);
  addBackgoundObject('img/cloud2.png', 2300 - cloudOffset, 20, 0.6, 1);

  addBackgoundObject('img/cloud1.png', 2800 - cloudOffset, 20, 0.8, 1);
  addBackgoundObject('img/cloud2.png', 3000 - cloudOffset, 20, 0.6, 1);
  addBackgoundObject('img/cloud2.png', 3200 - cloudOffset, 20, 0.6, 1);

}

function drawGround() {


  if (isMovingRight) {
    bg_elements = bg_elements - GAME_SPEED;
  }

  if (isMovingLeft && bg_elements < 500) {
    bg_elements = bg_elements + GAME_SPEED;
  }

  // draw Kaktus
  addBackgoundObject('img/bg_elem_1.png', 0, 195, 0.6, 0.6);// var sourceImg, X-Achse, Y-Achse,ScaleImg,
  addBackgoundObject('img/bg_elem_2.png', 450, 120, 0.6,);
  addBackgoundObject('img/bg_elem_1.png', 700, 255, 0.4, 0.8);
  addBackgoundObject('img/bg_elem_2.png', 1100, 260, 0.4);

  addBackgoundObject('img/bg_elem_1.png', 1200, 195, 0.6,);
  addBackgoundObject('img/bg_elem_2.png', 1450, 120, 0.6, 0.8);
  addBackgoundObject('img/bg_elem_1.png', 1700, 255, 0.4,);
  addBackgoundObject('img/bg_elem_2.png', 2000, 260, 0.4, 0.6);

  addBackgoundObject('img/bg_elem_1.png', 2200, 195, 0.6,);
  addBackgoundObject('img/bg_elem_2.png', 2450, 120, 0.6, 0.8);
  addBackgoundObject('img/bg_elem_1.png', 2700, 255, 0.4,);
  addBackgoundObject('img/bg_elem_2.png', 3000, 260, 0.4, 0.6);

  addBackgoundObject('img/bg_elem_1.png', 3200, 195, 0.6,);
  addBackgoundObject('img/bg_elem_2.png', 3450, 120, 0.6, 0.8);
  addBackgoundObject('img/bg_elem_1.png', 3700, 255, 0.4,);
  addBackgoundObject('img/bg_elem_2.png', 4000, 260, 0.4, 0.6);
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
    if (k == 'd' && collectedBottles > 0) { //bottle number must be above zero
      let timePassed = new Date().getTime() - bottleThrowTime;
      if (timePassed > 1000) {
        collectedBottles--;
        bottleThrowTime = new Date().getTime();
        // Bottle throw
      }
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