function draw_circle(x = 0, y = 0, radius = 20) {
  fill(45 / 360 * 255, 248, 255);
  noStroke();
  circle(x, y, radius);
}

function draw_connection(scale_x, scale_y, hue) {
  strokeWeight(6);
  stroke(45 / 360 * 255, 248, 255);
  noFill();
  curve(scale_x / 3, scale_y, 0, 0, scale_x, 0, 2 * scale_x / 3, scale_y);
}

function draw_all_connections(scale_x = width / 3, scale_y = height, res = 0.4) {
  let max = 3.8;
  for (let i = -max; i <= max; i += res) {
    draw_connection(scale_x, i * scale_y, i);
  }
  let radius = scale_x / 20;
  draw_circle(0, 0, radius);
  draw_circle(scale_x, 0, radius);
}

function setup() {
  colorMode(HSB, 255);
  let siz = 900;
  createCanvas(3 * siz, siz);
  background(4, 199, 244);
  let to = color(4, 199, 244);
  let from = color(0x00, 0x00, 0x21);
  let radius = width / 1.5;
  translate(width / 3, height);
  draw_curve(createVector(0, 0), 0.5, 0.75, radius, radius);
  resetMatrix();
  translate(width - width / 3, 0);
  draw_curve(createVector(0, 0), 0.0, 0.25, radius, radius);
  resetMatrix();

  translate(width / 3, height / 2);
  draw_all_connections(width / 3, height/1.2, 0.4);
  resetMatrix();

  noLoop();
}
