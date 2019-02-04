function setup() {
  colorMode(HSB, 255);
  let siz = windowWidth * pixelDensity();
  createCanvas(siz, siz / 3);
  background(0, 0, 0xff);

  let from = color(0x00, 0x00, 0xff);
  let to = color(4, 199, 244);
  draw_transition(from, to, height / 20);

  resetMatrix();
  translate(width / 2, height / 2);
  draw_vert_line(0, height / 2, color(163, 199, 244));
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
