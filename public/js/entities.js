import Entity from './Entity.js';
import { Go } from './traits/Go.js';
import { Jump } from './traits/Jump.js';
import { Velocity } from './traits/Velocity.js';
import { Vector2 } from './math.js';
import { loadMarioSprite } from './sprites.js';

export function createMario({ position, velocity, size = { x: 14, y: 16 } }) {
  return loadMarioSprite().then(sprite => {
    const mario = new Entity({
      position,
      velocity,
      size,
    });

    mario.addTrait(new Go());
    mario.addTrait(new Jump());
    //mario.addTrait(new Velocity());

    mario.draw = function(context) {
      sprite.draw('idle', context, this.position.x, this.position.y);
    };

    return mario;
  });
}
