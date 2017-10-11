import Compositor from './Compositor.js';
import { loadMarioSprite, loadBackgroundSprites } from './sprites.js';
import { loadLevel } from './loaders.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel('1-1'),
]).then(([marioSprite, backgroundSprites, level]) => {
  const compositor = new Compositor();

  const backgroundLayer = createBackgroundLayer(
    level.backgrounds,
    backgroundSprites,
  );
  compositor.layers.push(backgroundLayer);

  const pos = { x: 64, y: 64 };
  const spriteLayer = createSpriteLayer(marioSprite, pos);
  compositor.layers.push(spriteLayer);

  function update() {
    compositor.draw(context);

    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update);
  }

  update();
});
