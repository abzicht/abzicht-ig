function setup() {
  colorMode(HSB, 255);
  let siz = windowWidth * pixelDensity();
  createCanvas(siz, siz / 3);
  let blue = color(163, 199, 244);
  background(0, 0, 0xff);

  translate(width / 2, height);
  stroke(blue);
  strokeWeight(6);
  draw_single_branches();
}