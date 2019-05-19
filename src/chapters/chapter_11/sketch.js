
function setup() {
	colorMode(HSB, 255);
	let siz = windowWidth * pixelDensity();
	createCanvas(siz, siz / 3);
	let blue = color(163, 199, 244);
	let white = color(163, 1, 0xff);
	let grey = color(0,0,200);
	let dark_grey = color(0,0,100);
	background(blue);

	draw_transition(color(163,199,0), blue, resolution = height/20, start = 0, stop = 1, random_ = false);
	drawStars();
	let radius = height / 3;
	stroke(dark_grey);
	strokeWeight(radius/30);
	line(radius*2, 0, radius*2, radius/2);
	noFill();
	circle(radius*2, radius/2, radius/10);
	noStroke();
	fill(dark_grey);
	circle(radius*2, radius/2 - radius/10, radius/20);
	fill(grey);
	stroke(dark_grey);
	circle(radius*2, radius * 1.5, radius);

	translate(radius * 2, radius * 1.5);
	for (let i = 0; i < 20; i++){
		let x = map(random(), 0, 1, -radius/1, radius/1);
		let y = map(random(), 0, 1, -radius/1, radius/1);
		let size = map(random(), 0, 1, 0, radius/3);
		let brightness = map(random(), 0, 1, 160, 235);
		strokeWeight(size/10);
		fill(0,0, brightness);
		if(createVector(x,y).mag() + size > radius){
			continue;
		}
		circle(x, y, size);
	}

}

let drawStars = function(){
	noStroke();
	let noiseScale = 0.01;
	for (let i = 0; i < 172; i++) {
			let x, y = 0;
			x = random() * width;
			y = height/10 + (random() * (height * 0.8));
			let scale = noise(x * noiseScale, y * noiseScale);
			let random_hue = noise(x * noiseScale, y * noiseScale);
			fill(100 - (200 * random_hue), 255 - (400 * random_hue), 255);
			circle(x, y, 10 * scale);

	}
}
