function setup() {
  colorMode(HSB, 255);
  let siz = windowWidth * pixelDensity();
  createCanvas(siz, siz / 3);

  let from = color(4, 199, 244);
  let to = color(4, 0x01, 0x21);
  draw_transition(from, to, height / 20);
  draw_sin(12, height / 4, 0.0001, width / 3);
  let radius = width / 1.5;
  translate(width / 3, 0);
  draw_curve(createVector(0, 0), 0.25, 0.5, radius);
  noLoop();
}