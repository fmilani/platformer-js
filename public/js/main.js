import SpriteSheet from './SpriteSheet.js';
import { loadImage, loadLevel } from './loaders.js';

function drawBackground(background, context, spriteSheet) {
  background.ranges.forEach(({ x_start, x_end, y_start, y_end }) => {
    for (let x = x_start; x < x_end; x++) {
      for (let y = y_start; y < y_end; y++) {
        spriteSheet.drawTile(background.tile, context, x, y);
      }
    }
  });
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
const TILE_SIZE = 16;

loadImage('/img/tiles.png').then(image => {
  const spriteSheet = new SpriteSheet(image, TILE_SIZE, TILE_SIZE);
  spriteSheet.define('ground', 0, 0);
  spriteSheet.define('sky', 3, 23);

  loadLevel('1-1').then(level => {
    level.backgrounds.forEach(background => {
      drawBackground(background, context, spriteSheet);
    });
  });
});
