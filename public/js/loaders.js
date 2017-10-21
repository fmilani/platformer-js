import Level from './Level.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import { loadBackgroundSprites } from './sprites.js';

export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.src = url;
    image.addEventListener('load', () => {
      resolve(image);
    });
  });
}

function createTiles(level, backgrounds) {
  backgrounds.forEach(background => {
    background.ranges.forEach(({ x_start, x_end, y_start, y_end }) => {
      for (let x = x_start; x < x_end; x++) {
        for (let y = y_start; y < y_end; y++) {
          level.tiles.set(x, y, {
            name: background.tile,
          });
        }
      }
    });
  });
}

export function loadLevel(name) {
  return Promise.all([
    fetch(`/levels/${name}.json`).then(response => response.json()),
    loadBackgroundSprites(),
  ]).then(([levelSpec, backgroundSprites]) => {
    const level = new Level();

    createTiles(level, levelSpec.backgrounds);

    const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
    level.compositor.layers.push(backgroundLayer);

    const spriteLayer = createSpriteLayer(level.entities);
    level.compositor.layers.push(spriteLayer);

    return level;
  });
}
