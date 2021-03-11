let imagePaths = ['img/caracter/I-1.png','img/caracter/W-21.png', 'img/caracter/W-22.png',
'img/caracter/W-23.png', 'img/caracter/W-24.png', 'img/caracter/W-25.png','img/caracter/I-1left.png', 'img/caracter/W-21left.png', 'img/caracter/W-22left.png',
'img/caracter/W-23left.png', 'img/caracter/W-24left.png', 'img/caracter/W-25left.png', 'img/caracter/J-34.png', 'img/Outro/you-win-png.png', 'img/Outro/1.you lost.png', 'img/bigboss/G1.png', 'img/bigboss/G26.png', 'img/icon/Marcadorvida_enemy/Naranja.png', 'img/tabasco.png', 'img/icon/Icono/Botella.png', 'img/icon/Icono/Monedas.png', 'img/icon/Barra/Marcador vida/verde/100_.png', 'img/bottle/bottle1.png', 'img/enemy/2-Ga_centro.png', 'img/enemy/2.Centro.png', 'img/BG/Capas/cloud1.png', 'img/BG/Capas/cloud2.png', 'img/BG/Completo.png', 'img/sand.png']

let images = []


/**

* Preload all images. This function should be executed before starting the game.

* imagePaths should contain all images that will be loaded: ['img/image1.png', 'img/image2.png', 'img/image3.png', ...]

*/

function preloadImages() {

  for (let i = 0; i < imagePaths.length; i++) {

    let image = new Image();

    image.src = imagePaths[i];

    images.push(image); // push image-path to images-array (which contains all image-paths)

  }

}
/**

   * Check if background-image is already loaded in cache; if not, create new image

   * @param {string} src_path - scr-path of background-image 

   */

function checkBackgroundImageCache(src_path) {

  // Check if image is found in images-array.

  base_image = images.find(function (img) {

    return img.src.endsWith(src_path.substring(src_path, src_path.length));

  });

  

  // Create new image if not found in cache

  if (!base_image) {

    base_image = new Image();

    base_image.src = src_path;

  }
  return base_image;
}
