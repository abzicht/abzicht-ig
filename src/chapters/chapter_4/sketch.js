function setup() {
  colorMode(HSB, 255);
  let siz = windowWidth * pixelDensity();
  createCanvas(siz, siz / 3);

  let iterations = 200;

  resetMatrix();
  translate(width / 6, height / 2);
  draw_mandelbrot(iterations, 1.75, createVector(-0.5, 0), -1, 1, 32);
  draw_vert_line(height / 3.9, height / 2, color(32, 199, 244), color(0x00, 0x00, 0xff));

  resetMatrix();
  translate(width - width / 6, height / 2);
  draw_mandelbrot(iterations, 1.25, createVector(-0.5, 0), -1, 1, 61);
  draw_vert_line(height / 2.8, height / 2, color(61, 199, 244), color(0x00, 0x00, 0xff));

  resetMatrix();
  translate(width / 2, height / 2);
  draw_mandelbrot(iterations, 1.5, createVector(-0.5, 0), 1, -1, 163);
  draw_vert_line(height / 3.9, height / 2, color(163, 199, 244), color(0x00, 0x00, 0xff));
  draw_vert_line(-height / 2, 0, color(163, 199, 244));
}

function draw_mandelbrot(iterations, scale, offset = createVector(0, 0), x_mirror = 1, y_mirror = 1, hue = 0x00, x_bounds = {
  start: -width / 6,
  stop: width / 6
}) {
  strokeWeight(2);
  let vect = createVector(0, 0);
  for (vect.x = x_bounds.start; vect.x < x_bounds.stop; vect.x++) {
    for (vect.y = -height / 2; vect.y < height / 2; vect.y++) {
      let scaled_vect = offset.copy();
      scaled_vect.x += x_mirror * map(vect.y, -height / 2, height / 2, -scale, scale);
      scaled_vect.y += y_mirror * map(vect.x, -width / 2, width / 2, -scale * 3, scale * 3);
      let c = mandelbrot(scaled_vect, iterations);
      if (c == -1) {
        let val = hue + abs(sin(map(vect.x, x_bounds.start, x_bounds.stop, 0, TWO_PI))) * 0x11;
        stroke(val, 199, 244);
        point(vect.x, vect.y);
      } else {
        stroke(map(cos(map(c, 0, iterations, 0, TWO_PI)), -1, 1, hue, 4), 199, 244);
        point(vect.x, vect.y);
      }
    }
  }
}

function draw_vert_line(start, stop, col = color(0, 0, 0xff), to = null) {
  let step = 1;
  strokeWeight(6);
  noFill();
  for (let i = start; i <= stop; i += step) {
    let c = null;
    if (to != null) {
      c = lerpColor(col, to, map(i, start, stop, 0, 1));
    } else {
      c = col;
    }
    stroke(c);
    line(0, i, 0, i + step);
  }
}