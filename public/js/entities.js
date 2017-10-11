import Entity from './Entity.js';
import { Velocity } from './traits/Velocity.js';
import { Jump } from './traits/Jump.js';
import { Vector2 } from './math.js';
import { loadMarioSprite } from './sprites.js';

export function createMario({ position, velocity = { x: 0, y: 0 } }) {
  return loadMarioSprite().then(sprite => {
    const mario = new Entity({
      position,
      velocity,
    });

    mario.addTrait(new Velocity());
    mario.addTrait(new Jump());

    mario.draw = function(context) {
      sprite.draw('idle', context, this.position.x, this.position.y);
    };

    return mario;
  });
}
