function setup() {
  colorMode(HSB, 255);
  let siz = windowWidth * pixelDensity();
  createCanvas(siz, siz / 3);
  background(4, 199, 244);

  let from = color(4, 0x00, 0x21);
  let to = color(4, 199, 244);
  //draw_transition(from, to, height / 20);

  resetMatrix();
  translate(width / 2, height);
  new Branch(createVector(0,0), height / 6.1, width / 2, 0, 8, color(163,199,244), color(163,0,0xff)).draw(8);
  stroke(color(163, 199, 244));
  strokeWeight(6);
  line(0, 0, 0, -height);
}
