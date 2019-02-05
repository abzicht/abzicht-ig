function setup() {
  colorMode(HSB, 255);
  let siz = windowWidth * pixelDensity();
  createCanvas(siz, siz / 3);
  background(0, 0, 0xff);

  resetMatrix();
  translate(width / 2, height / 2);
  stroke(color(163, 199, 244));
  strokeWeight(6);
  line(0, height / 2, 0, -height / 2);
}
