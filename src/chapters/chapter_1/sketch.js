function get_y(x, scale_x) {
  return cos(x * TWO_PI * scale_x);
}

function get_brightness(x, scale) {
  return map(cos(x * TWO_PI * scale + HALF_PI), -1, 1, 0x21, 0xff);
}

function draw_sin(res) {
  let scale = height / 4;
  let scale_x = 6*3;
  for (let x = 0.0; x <= 1; x += res) {
    let y = get_y(x, scale_x);
    let next_y = get_y(x + res, scale_x);
    let col = get_brightness(x, scale_x);
    stroke(0xff, 0x00, col);
    strokeWeight(abs(y) * 1 + 5);
    line(x * width, y * scale, (x + res) * width, next_y * scale);
  }
}

function setup() {
  colorMode(HSB, 255);
  let siz = windowWidth*pixelDensity();
  createCanvas(siz, siz/3);
  background(0x21);
  translate(0, height / 2);
  draw_sin(0.001);
  noLoop();
}
