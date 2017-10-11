import Entity from './Entity.js';
import { Vector2 } from './math.js';
import { loadMarioSprite } from './sprites.js';

const GRAVITY = 2000;
export function createMario({ position, velocity }) {
  return loadMarioSprite().then(sprite => {
    const mario = new Entity({
      position,
      velocity,
    });

    mario.draw = function(context) {
      sprite.draw('idle', context, this.position.x, this.position.y);
    };

    mario.update = function(deltaTime) {
      this.position.x += this.velocity.x * deltaTime;
      this.position.y += this.velocity.y * deltaTime;
      mario.velocity.y += GRAVITY * deltaTime;
    };

    return mario;
  });
}
