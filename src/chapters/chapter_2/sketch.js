function setup() {
  colorMode(HSB, 255);
  let siz = windowWidth*pixelDensity();
  createCanvas(siz, siz/3);

  let from = color(4, 199, 244);
  let to = color(0x00, 0x00, 0x21);
  draw_transition(from, to, height / 20);
  draw_sin(12,height/4, 0.0001, width / 3);
	let radius = width /1.5;
  translate(width / 3, 0);
  draw_curve(createVector(0,0), 0.25, 0.5, radius);
  noLoop();
}

function draw_transition(from, to, resolution, start = 0, stop = 1) {
  start_x = map(start, 0, 1, 0, width);
  start_y = map(start, 0, 1, 0, height);
  stop_x = map(stop, 0, 1, 0, width);
  stop_y = map(stop, 0, 1, 0, height);
  noStroke();
  for (let i = start_y; i < stop_y; i += resolution) {
    for (let j = start_x; j < stop_x; j += resolution) {
      //let percentage_x = map(j, start_x, stop_x, 0, 1);
      let percentage_y = map(i, start_y, stop_y, 0, 1);
      let value = percentage_y - random(0.3 * (1 - percentage_y));
      fill(lerpColor(from, to, value));
      rect(j, i, resolution, resolution);
    }
  }
}
