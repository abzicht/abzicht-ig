function draw_curve(vect, start, stop, width, height = -1) {
  noFill();
  if (height == -1) {
    height = width;
  }
  strokeWeight(6);
  stroke(0, 0, 0xff);
  arc(vect.x, vect.y, width/2, height/2, map(start, 0, 1, 0, TWO_PI), map(stop, 0, 1, 0, TWO_PI));
}

function draw_sin(freq = 12, scale = height / 4, res, x_start = width / 2, x_end = width) {
  function get_y(x, freq, scale_y) {
    return cos(x * TWO_PI * freq) * map(x ** 2, 0.0, 1.0, 0.0, scale_y);
  }

  function get_weight(x, freq, min = 5) {
    return abs(cos(x * TWO_PI * freq)) + min;
  }

  function get_brightness(x, scale) {
    return map(cos(x * TWO_PI * scale + HALF_PI), -1, 1, 0x0, 0xff);
  }
  translate(x_start, height / 2);
  for (let x = 0.0; x <= 1; x += res) {
    let y = get_y(x, freq, scale);
    let next_y = get_y(x + res, freq, scale);
    let col = get_brightness(x, freq);
    stroke(0xff, 0x00, 0xff, col);
    strokeWeight(get_weight(x, freq, 5));
    line(x * (x_end - x_start), y, (x + res) * (x_end - x_start), next_y);
  }
  resetMatrix();
}

function draw_noise(from, to, resolution, start = 0, stop = 1) {
  loadPixels();
  let d = pixelDensity();
  start = map(start, 0, 1, 0, 4 * width * height * (d ** 2));
  stop = map(stop, 0, 1, 0, 4 * width * height * (d ** 2));
  let rand = random(resolution - 1) + 1;
  for (let i = start; i < stop; i += round(rand) * 4) {
    rand = random(resolution - 1) + 1;
    let pink = lerpColor(from, to, random());
    pixels[i] = red(pink);
    pixels[i + 1] = green(pink);
    pixels[i + 2] = blue(pink);
    pixels[i + 3] = alpha(pink);
  }
  updatePixels();
}
