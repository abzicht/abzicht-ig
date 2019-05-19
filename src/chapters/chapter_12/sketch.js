
function setup() {
	colorMode(HSB, 255);
	let siz = windowWidth * pixelDensity();
	createCanvas(siz, siz / 3);
	let grey = color(0,0,200);
	let dark_grey = color(0,0,100);
	background(0);

	//ceiling();

	drawStars();
	drawPlanets();
	let startpoint = createVector(height * 2/3, height);
	stroke(dark_grey);
	strokeWeight(startpoint.x/60);
	line(startpoint.x, startpoint.y, startpoint.x, 0);
	noLoop();
}

function ceiling(){
	let scale = height * 10;
	let offset = height / 4;
	fill(0,0x0,100);
	noStroke();
	circle(width/2, scale - offset, scale);
	fill(0);
	stroke(0,0,100);
	circle(width/2, offset + scale, scale);
}

let drawPlanets = function(){
	let noiseScale = 0.01;
	for (let i = 0; i < random(5,9); i++) {
		let x, y = 0;
		x = random() * width;
		y = height/10 + (random() * (height * 0.8));
		translate(x,y);
		let scale = noise(x * noiseScale, y * noiseScale);
		let random_hue = noise(x * noiseScale, y * noiseScale);
		let has_ring = random() > 0.0;
		let hue_ = abs(200 - (200 * random_hue));
		let sat_ = 255 - (100 * random_hue);
		let planet_size = 100 * scale;
		let ring_width = planet_size * 3;
		let ring_height = planet_size * map(random(),0,1,0.25,0.75);
		let ring_color = color(hue_, sat_, 200);
		let ring_rotation = random(-0.5,0.5);
		if(has_ring){
			noFill();
			stroke(ring_color);
			strokeWeight(20 * scale);
			rotate(ring_rotation);
			arc(0,0, ring_width, ring_height, 0, PI * PI );
			resetMatrix();
			translate(x,y);
		}
		let planet_color = color(hue_, sat_, 255);
		fill(planet_color);
		noStroke();
		circle(0,0, planet_size);
		if(has_ring){
			noFill();
			stroke(ring_color);
			strokeWeight(20 * scale);
			rotate(ring_rotation);
			arc(0,0, ring_width, ring_height, 0, PI);
		}
		resetMatrix();
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
		fill(200 - (200 * random_hue), 255 - (400 * random_hue), 255);
		circle(x, y, 10 * scale);
	}
}
