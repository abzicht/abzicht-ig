function get_sin(x, sins) {
  return sin(x * sins);
}

function get_vec(i, amplitude, sins) {
  let x_ = map(i, 0, 1, 0, TWO_PI);
  let y_ = map(i, 0, 1, 0, TWO_PI);
  let vec = createVector(0, 0);
  vec.x = cos(x_);
  vec.y = sin(y_);
  vec = vec.mult(amplitude * (1.0 / amplitude + get_sin(x_, sins)));
  return vec;
}

function get_brightness(x, sins) {
  let x_ = get_sin(x, sins * TWO_PI);
  let col = map(x_, -1, 1, 0x21, 0xff);
  return col;
}

function drawsin(res) {
  let scale = height / 4;
  let sins = 42;
  let amplitude = 0.5;

  for (let x = 0.0; x <= 1; x += res) {
    let vec = get_vec(x, amplitude, sins);
    let next_vec = get_vec(x + res, amplitude, sins);

    let col = get_brightness(x, sins);
    stroke(0xff, 0x00, col);
    strokeWeight(abs(vec.y) * 1 + 5);

    line(vec.x * scale, vec.y * scale,
      next_vec.x * scale, next_vec.y * scale);
  }
}

function setup() {
  colorMode(HSB, 255);
  let size = 900;
  createCanvas(size, size);
  background(0x21);
  translate(width / 2, height / 2);
  drawsin(0.0001);
  noLoop();
}
