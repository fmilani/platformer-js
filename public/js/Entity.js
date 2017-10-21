import { Vector2 } from './math.js';

export class Trait {
  constructor(name) {
    this.NAME = name;
  }

  update() {
    console.warn('Unhandled update call in Trait');
  }
}

// Represents any object that can be on a screen
export default class Entity {
  constructor({
    position = { x: 0, y: 0 },
    velocity = { x: 0, y: 0 },
    size = { x: 0, y: 0 },
  }) {
    this.position = new Vector2(position);
    this.velocity = new Vector2(velocity);
    this.size = new Vector2(size);

    this.traits = [];
  }

  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  update(deltaTime) {
    this.traits.forEach(trait => {
      trait.update(this, deltaTime);
    });
  }
}
