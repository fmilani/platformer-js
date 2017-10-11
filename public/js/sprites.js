import SpriteSheet from './SpriteSheet.js';
import { loadImage } from './loaders.js';
// TODO: rename this function to create*Sprite

const TILE_SIZE = 16;

export function loadMarioSprite() {
  return loadImage('/img/characters.gif').then(image => {
    const spriteSheet = new SpriteSheet(image, TILE_SIZE, TILE_SIZE);
    spriteSheet.define('idle', 276, 44, TILE_SIZE, TILE_SIZE);
    return spriteSheet;
  });
}

export function loadBackgroundSprites() {
  return loadImage('/img/tiles.png').then(image => {
    const spriteSheet = new SpriteSheet(image, TILE_SIZE, TILE_SIZE);
    spriteSheet.defineTile('ground', 0, 0);
    spriteSheet.defineTile('sky', 3, 23);
    return spriteSheet;
  });
}
