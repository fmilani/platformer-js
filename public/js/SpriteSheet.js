export default class SpriteSheet {
  constructor(image, spriteWidth, spriteHeight) {
    this.image = image;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.tiles = new Map();
  }

  define(name, x, y) {
    const buffer = document.createElement('canvas');
    buffer.spriteWidth = this.spriteWidth;
    buffer.spriteHeight = this.spriteHeight;
    buffer
      .getContext('2d')
      .drawImage(
        this.image,
        x * this.spriteWidth,
        y * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        0,
        0,
        this.spriteWidth,
        this.spriteHeight,
      );
    this.tiles.set(name, buffer);
  }

  draw(name, context, x, y) {
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
  }

  drawTile(name, context, x, y) {
    this.draw(name, context, x * this.spriteWidth, y * this.spriteHeight);
  }
}
