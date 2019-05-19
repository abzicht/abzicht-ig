let windmills = [];
let airplanes = [];

function setup() {
	colorMode(HSB, 255);
	frameRate(30);
	let siz = windowWidth * pixelDensity();
	createCanvas(siz, siz / 3);
	let blue = color(163, 199, 244);
	let white = color(163, 1, 0xff);
	background(blue);

	noStroke();
	fill(40, 199, 244);
	circle(width, 0, height / 1.5);
	resetMatrix();
	create_windmills();
	create_windmills(width / 10, height * 0.02, -width / 20);
	create_airplanes();

}


function draw() {
	for (let windmill of windmills) {
		windmill.draw();
	}
	for (let airplane of airplanes) {
		airplane.draw();
	}
}


function create_windmills(resolution = width / 10, tree_size = height * 0.08, offset = 0) {
	for (let i = resolution + offset; i < width / 2; i += resolution) {
		noStroke();
		fill(0, 0, 0xff);
		for (let j of [-1, 1]) {
			resetMatrix();
			translate(j * i + width / 2, height);
			let rdm = random(2.5, 3.5);
			let y_height = -tree_size * rdm * 2;
			let top_width = tree_size / 10;
			beginShape();
			vertex(-tree_size / 3, 0);
			vertex(tree_size / 3, 0);
			vertex(top_width, y_height);
			vertex(-top_width, y_height);
			endShape(CLOSE);
			let windmill = new Windmill(createVector(j * i + width / 2, height + y_height), top_width, random(0, TWO_PI))
			windmills = windmills.concat(windmill);
		}
	}
}


class Windmill {
	constructor(loc, radius, rot) {
		this.loc = loc.copy();
		this.radius = radius;
		this.rot = rot;
		this.len = this.radius * 30;
	}

	draw() {
		this.rot -= 0.01;
		noStroke();
		fill(abs(this.rot) * (255 / TWO_PI) % 255, 199, 244);
		strokeWeight(1);
		resetMatrix();
		translate(this.loc.x, this.loc.y);
		rotate(this.rot);
		this.draw_wing();
		rotate(TWO_PI / 3);
		this.draw_wing();
		rotate(TWO_PI / 3);
		this.draw_wing();
		fill(0, 0, 0xff);
		circle(0, 0, this.radius * 2);
	}

	draw_wing() {

		beginShape();
		vertex(0, 0);
		vertex(this.radius * 1.5, 0);
		vertex(this.radius * 1.5, this.len);
		vertex(this.radius * 1.2, this.len);
		endShape(CLOSE);
	}
}


function create_airplanes() {
	airplanes = airplanes.concat(new Airplane(createVector(0, height / 8), 20, -HALF_PI));
	airplanes = airplanes.concat(new Airplane(createVector(width, height / 8), 20, HALF_PI));
}

class Airplane {
	constructor(loc, radius, rot) {
		this.loc = loc.copy();
		this.radius = radius;
		this.rot = rot;
	}

	draw() {
		let step = 2;
		if (this.rot > 0) {
			step *= -1;
		}
		this.loc.x += step;
		resetMatrix();
		translate(this.loc.x, this.loc.y);
		rotate(this.rot);
		stroke(163, 199, 244);
		fill(0, 0, 0xff);
		triangle(0, 0, this.radius, 0, this.radius / 2, this.radius);
		noStroke();
		fill(163, 199, 244);
		square(0, -this.radius, this.radius);
		stroke(0, 0, 0xff);
		line(this.radius / 3, -this.radius, this.radius / 3, -this.radius - abs(step));
		line(this.radius / 1.5, -this.radius, this.radius / 1.5, -this.radius - abs(step));
	}
}
