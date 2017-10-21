import Timer from './Timer.js';
import { createMario } from './entities.js';
import { createCollisionLayer } from './layers.js';
import { loadLevel } from './loaders.js';
import { Vector2 } from './math.js';

import { setupKeyboard } from './input.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  createMario({
    position: { x: 64, y: 10 },
  }),
  loadLevel('1-1'),
]).then(([mario, level]) => {
  level.compositor.layers.push(createCollisionLayer(level));

  level.entities.add(mario);

  const input = setupKeyboard(mario);
  input.listenTo(window);

  const timer = new Timer(1 / 60);
  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    level.compositor.draw(context);
  };

  timer.start();
});
