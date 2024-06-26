import { createCanvas } from 'canvas';

HTMLCanvasElement.prototype.getContext = function (type) {
  if (type === '2d') {
    return createCanvas(4000, 4000).getContext(type);
  }
  return null;
};
