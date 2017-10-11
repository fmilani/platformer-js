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
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;

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
