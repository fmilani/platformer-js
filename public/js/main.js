import Compositor from './Compositor.js';
import Timer from './Timer.js';
import { loadBackgroundSprites } from './sprites.js';
import { createMario } from './entities.js';
import { loadLevel } from './loaders.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import { Vector2 } from './math.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  createMario({
    position: new Vector2({ x: 64, y: 220 }),
    velocity: new Vector2({ x: 200, y: -700 }),
  }),
  loadBackgroundSprites(),
  loadLevel('1-1'),
]).then(([mario, backgroundSprites, level]) => {
  const compositor = new Compositor();

  const backgroundLayer = createBackgroundLayer(
    level.backgrounds,
    backgroundSprites,
  );
  compositor.layers.push(backgroundLayer);

  const spriteLayer = createSpriteLayer(mario);
  compositor.layers.push(spriteLayer);

  const timer = new Timer(1 / 60);

  timer.update = function update(deltaTime) {
    mario.update(deltaTime);
    compositor.draw(context);
  };

  timer.start();
});
