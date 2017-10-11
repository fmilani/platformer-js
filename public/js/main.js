import Compositor from './Compositor.js';
import Timer from './Timer.js';
import { loadBackgroundSprites } from './sprites.js';
import { createMario } from './entities.js';
import { loadLevel } from './loaders.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import { Vector2 } from './math.js';

import KeyboardState from './KeyboardState.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  createMario({
    position: new Vector2({ x: 64, y: 220 }),
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

  const SPACE = 32;
  const input = new KeyboardState();
  input.addMapping(SPACE, keyState => {
    if (keyState) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
    console.log(keyState);
  });
  input.listenTo(window);

  const spriteLayer = createSpriteLayer(mario);
  compositor.layers.push(spriteLayer);

  const GRAVITY = 2000;

  const timer = new Timer(1 / 60);

  timer.update = function update(deltaTime) {
    mario.update(deltaTime);
    compositor.draw(context);

    mario.velocity.y += GRAVITY * deltaTime;
  };

  timer.start();
});
