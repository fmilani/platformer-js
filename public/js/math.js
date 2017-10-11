export class Vector2 {
  // TODO: create add method
  constructor({ x = 0, y = 0 }) {
    this.set({ x, y });
  }

  set({ x, y }) {
    this.x = x;
    this.y = y;
  }
}
