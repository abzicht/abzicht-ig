function setup() {
  colorMode(HSB, 255);
  let siz = windowWidth * pixelDensity();
  createCanvas(siz, siz / 3);
  let blue = color(163, 199, 244);
  background(0, 0, 0xff);

  translate(width / 2, height);
  let step_x = 6 * 4;
  let start = step_x * 1;
  let stop = width - step_x * 1;
  for (let i = start; i <= stop; i += step_x) {
    stroke(blue);
    strokeWeight(6);
    let switch_offset = (((i % (step_x * 2) == step_x) ? -1 : 1) * step_x * 0.5);
    let height_offset = -height * map(i, start, stop, 1.5, 0);
    line(-i / 2 - switch_offset, 0, -i / 2 - switch_offset, height_offset);
    line(i / 2 + switch_offset, 0, i / 2 + switch_offset, height_offset);
    let radius = step_x * 2;
    let left_vec = createVector(-i / 2 - switch_offset - radius / 4, height_offset);
    let right_vec = createVector(i / 2 + switch_offset + radius / 4, height_offset);
    draw_curve(left_vec, 0.75, 1, radius, radius, blue);
    draw_curve(right_vec, 0.5, 0.75, radius, radius, blue);
    line(left_vec.x, left_vec.y - radius / 4, -width / 2, left_vec.y - radius / 4);
    line(right_vec.x, right_vec.y - radius / 4, width / 2, right_vec.y - radius / 4);
  }
}