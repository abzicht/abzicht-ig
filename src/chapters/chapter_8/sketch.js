function setup() {
  colorMode(HSB, 255);
  let siz = windowWidth * pixelDensity();
  createCanvas(siz, siz / 3);
  let white = color(163, 1, 0xff);
  let blue = color(163, 199, 244);
  background(0, 0, 0xff);

  draw_transition(blue, color(163, 0x1, 0xff), 10, 0, 1, false);

  translate(width / 2, height);
  let step_x = 6 * 4;
  let start = step_x * 2;
  let stop = (width - step_x) / 3 + step_x;
  for (let i = start; i <= stop; i += step_x) {
    stroke(blue);
    strokeWeight(6);
    let switch_offset = (((i % (step_x * 2) == step_x) ? -1 : 1) * step_x * 0.5);
    let val = map(i, start, stop, 1, 1.5);
    let height_offset = height - height * val;
    line(-i / 2 - switch_offset, 0, -i / 2 - switch_offset, height_offset);
    line(i / 2 + switch_offset, 0, i / 2 + switch_offset, height_offset);
    let radius = step_x * 2;
    let left_vec = createVector(-i / 2 - switch_offset + radius / 4, height_offset);
    let right_vec = createVector(i / 2 + switch_offset - radius / 4, height_offset);
    draw_curve(left_vec, 0.5, 0.75, radius, radius, blue);
    draw_curve(right_vec, 0.75, 1, radius, radius, blue);

    line(left_vec.x, left_vec.y - radius / 4, -radius / 4, left_vec.y - radius / 4);
    line(right_vec.x, right_vec.y - radius / 4, radius / 4, right_vec.y - radius / 4);
    let left_center_vec = createVector(-radius / 4, left_vec.y);
    let right_center_vec = createVector(radius / 4, right_vec.y);
    draw_curve(left_center_vec, 0.75, 1, radius, radius, blue);
    draw_curve(right_center_vec, 0.5, 0.75, radius, radius, blue);
  }
  resetMatrix();
  translate(width / 2, 0);
  stroke(0, 0, 0xff);
  for (let i = step_x / 2; i <= height / 2 - step_x / 2; i += step_x) {
    let norm = map(i, step_x / 2, height / 2 - step_x / 2, 0, 1);
    let width_ = map(norm, 0, 1, 0, stop / 2);
    line(-width_, i, width_, i);
    fill(0, 0, 0xff);
    circle(-width_, i, step_x / 4);
    circle(width_, i, step_x / 4);
  }
  translate(-width / 6 - step_x * 2, height / 2 + step_x);
  for (let i = step_x / 2; i <= height / 2 - step_x / 2; i += step_x) {
    let norm = map(i, step_x / 2, height / 2 - step_x / 2, 0, 1);
    let width_ = map(norm, 0, 1, 0, stop / 2);
    line(-width_, i, 0, i);
    fill(0, 0, 0xff);
    circle(-width_, i, step_x / 4);
    circle(0, i, step_x / 4);
  }
  resetMatrix();
  translate(2 * width / 3 + step_x * 2, height / 2 + step_x);
  for (let i = step_x / 2; i <= height / 2 - step_x / 2; i += step_x) {
    let norm = map(i, step_x / 2, height / 2 - step_x / 2, 0, 1);
    let width_ = map(norm, 0, 1, 0, stop / 2);
    line(width_, i, 0, i);
    fill(0, 0, 0xff);
    circle(width_, i, step_x / 4);
    circle(0, i, step_x / 4);
  }
}



function draw_spiral(turns, dir = 1, from = null, to = null, radius = 1 / height) {
  let resolution = radius;
  let i = 0;
  let vect = createVector(0, 0);
  let old_vect = null;
  while (i < turns * TWO_PI) {
    i += resolution;
    old_vect = vect.copy();
    vect.x = sin(dir * i) * i * 2;
    vect.y = cos(dir * i) * i * 2;
    // strokeWeight(i/(turns*TWO_PI) * 6);
    if (from != null && to != null) {
      stroke(lerpColor(from, to, map(i, 0, turns * TWO_PI, 0, 1)))
    }
    line(old_vect.x, old_vect.y, vect.x, vect.y);
  }
  return vect;
}