export default class SpriteSheet {
  constructor(image, spriteWidth, spriteHeight) {
    this.image = image;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.tiles = new Map();
  }

  define(name, x, y, spriteWidth, spriteHeight) {
    const buffer = document.createElement('canvas');
    buffer.spriteWidth = spriteWidth;
    buffer.spriteHeight = spriteHeight;
    buffer
      .getContext('2d')
      .drawImage(
        this.image,
        x,
        y,
        spriteWidth,
        spriteHeight,
        0,
        0,
        spriteWidth,
        spriteHeight,
      );
    this.tiles.set(name, buffer);
  }

  defineTile(name, x, y) {
    this.define(
      name,
      x * this.spriteWidth,
      y * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
    );
  }

  draw(name, context, x, y) {
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
  }

  drawTile(name, context, x, y) {
    this.draw(name, context, x * this.spriteWidth, y * this.spriteHeight);
  }
}
