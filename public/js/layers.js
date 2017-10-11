function drawBackground(background, context, spriteSheet) {
  background.ranges.forEach(({ x_start, x_end, y_start, y_end }) => {
    for (let x = x_start; x < x_end; x++) {
      for (let y = y_start; y < y_end; y++) {
        spriteSheet.drawTile(background.tile, context, x, y);
      }
    }
  });
}

export function createBackgroundLayer(backgrounds, spriteSheet) {
  const buffer = document.createElement('canvas');
  buffer.width = 256;
  buffer.height = 240;
  backgrounds.forEach(background => {
    drawBackground(background, buffer.getContext('2d'), spriteSheet);
  });
  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0);
  };
}

export function createSpriteLayer(entity) {
  return function drawSpriteLayer(context) {
    entity.draw(context);
  };
}
