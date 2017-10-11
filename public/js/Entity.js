// Represents any object that can be on a screen
export default class Entity {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
  }
}
