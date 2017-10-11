// Class that takes an array of layers and draw them in order
export default class Compositor {
  constructor() {
    this.layers = [];
  }

  draw(context) {
    this.layers.forEach(layer => {
      layer(context);
    });
  }
}
