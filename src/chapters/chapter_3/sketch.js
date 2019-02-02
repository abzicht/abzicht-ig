function draw_circle(){
	fill(0,0,0x21);
	noStroke();
	circle(0,0, 20);
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
  draw_curve(createVector(0, 0), 0.5, 0.75, radius);
	translate(0,-height/2);
	draw_circle();
  resetMatrix();
  translate(width - width / 3, 0);
  draw_curve(createVector(0, 0), 0.0, 0.25, radius);
	translate(0,height/2);
	draw_circle();
}
