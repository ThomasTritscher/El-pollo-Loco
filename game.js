let canvas;
let ctx; //ctx = context
let character_x = 0; // Variable für X-Achse
let isMovingRight = false; //boolean variable
let isMovingLeft = false;
let bg_elements = 0;






function init() {
  canvas = document.getElementById('canvas'); // Html Element
  ctx = canvas.getContext("2d"); // der Bereich wo gemalt wird

  setInterval(function () {
    
    drawBackground();
    updateCharacter();
  }, 50);// Hintergund + Charakter werden alle 50ms gemalt

  listenForKeys();


}
function updateCharacter() {
  let base_image = new Image();// Variable
  base_image.src = 'img/charakter_1.png';// Quelle
  base_image.onload = function () { //Image wird gezeichnet
    ctx.drawImage(base_image, character_x, 250, base_image.width * 0.35, base_image.height * 0.35); // Parameter der Zeichnung
  };

}

function drawBackground() {

  ctx.fillStyle = "white"; //Farbauswahl
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  /*ctx.fillRect(100, 100, 200,200); //Form wird hinzugefügt, hier Viereck, Nummerierung koordinaten X-Achse,koordinaten Y-Achse,breite,höhe!*/

  drawGround();

}

function drawGround() {
  ctx.fillStyle = "#FFE699";
  ctx.fillRect(0, 375, canvas.width, canvas.height - 375);// Boden wird gezeichnet

  if(isMovingRight) {
    bg_elements = bg_elements - 2;
  }

  if(isMovingLeft) {
    bg_elements = bg_elements + 2;
  }
  //Kaktus1
  let base_image = new Image();// Variable
  base_image.src = 'img/bg_elem_1.png';// Quelle
  base_image.onload = function () { //Image wird gezeichnet
    ctx.drawImage(base_image, bg_elements, 195, base_image.width * 0.6, base_image.height * 0.6); // Parameter der Zeichnung
  };

  //Kaktus2
  let base_image2 = new Image();// Variable
  base_image2.src = 'img/bg_elem_2.png';// Quelle
  base_image2.onload = function () { //Image wird gezeichnet
    ctx.drawImage(base_image2, 200 + bg_elements, 195, base_image.width * 0.6, base_image.height * 0.6); // Parameter der Zeichnung
  };
}

function listenForKeys() { //bei Tastendruck Pfeil rechts
  document.addEventListener("keydown", e => {
    const k = e.key;
    console.log(k == 'ArrowRight')
    
    if (k == 'ArrowRight') {
      isMovingRight = true;
      character_x = character_x + 5; //um 10px auf X-Achse weiter
    }

    if (k == 'ArrowLeft') {
      isMovingLeft = true;
      character_x = character_x - 5; //um 10px auf X-Achse zurück
    }

  });

  document.addEventListener("keyup", e => { //loslassen der Taste
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

  });
}