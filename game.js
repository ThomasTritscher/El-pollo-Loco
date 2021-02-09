let canvas;
let ctx; //ctx = context
let character_x = 0; // Var for X-Achse
let character_y = 250; // Var for Y-Achse
let isMovingRight = false; //boolean var
let isMovingLeft = false;
let bg_elements = 0;
let lastJumpStarted = 0;

//-------------------Game config--------------

let JUMP_TIME = 300; // ms / Konstante immer GROß schreiben



function init() {
  canvas = document.getElementById('canvas'); // Html Tag
  ctx = canvas.getContext("2d"); // Zone for painting

  draw();

  listenForKeys();


}
function draw() {

  drawBackground();
  updateCharacter();
  requestAnimationFrame(draw);// drawing often as possible

}


function updateCharacter() {
  let base_image = new Image();// Variable
  base_image.src = 'img/charakter_1.png';//Source

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

}

function drawGround() {
  

  if (isMovingRight) {
    bg_elements = bg_elements - 2;
  }

  if (isMovingLeft) {
    bg_elements = bg_elements + 2;
  }


 addBackgoundObject('img/bg_elem_1.png', 0, 195, 0.6, 0.6);// var sourceImg, X-Achse, Y-Achse,ScaleImg,
 addBackgoundObject('img/bg_elem_2.png', 450, 120, 0.6,);
 addBackgoundObject('img/bg_elem_1.png', 700, 255, 0.4, 0.8);
 addBackgoundObject('img/bg_elem_2.png', 1100, 260, 0.4);

 //Draw ground
 ctx.fillStyle = "#FFE699";
 ctx.fillRect(0, 375, canvas.width, canvas.height - 375);
}

function addBackgoundObject(src, offsetX, offsetY, scale, opacity) {//opacity is an optional var!

  if(opacity != undefined) {
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
      character_x = character_x + 5; 
    }

    if (k == 'ArrowLeft') {
      isMovingLeft = true;
      character_x = character_x - 5; 
    }
    let timePassedSinceJump = new Date().getTime() - lastJumpStarted;

    if (e.code == 'Space' && timePassedSinceJump > JUMP_TIME * 2) {// Space funktioniert kein 2mal in einer Zeitspanne unter 300ms *2,
      lastJumpStarted = new Date().getTime();
    }

  });

  document.addEventListener("keyup", e => { //Key less
    const k = e.key;
    console.log(k == 'ArrowRight')

    if (k == 'ArrowRight') {
      isMovingRight = false;
      character_x = character_x + 5;
    }

    if (k == 'ArrowLeft') {
      isMovingLeft = false;
      character_x = character_x - 5;
    }
    //  if (e.code == 'Space') {
    //   isJumping = false;
    //  }

  });
}