import { Trait } from '../Entity.js';

export class Go extends Trait {
  constructor() {
    super('go');

    this.direction = 0;
    this.speed = 6000;
  }

  update(entity, deltaTime) {
    entity.velocity.x = this.speed * this.direction * deltaTime;
  }
}
