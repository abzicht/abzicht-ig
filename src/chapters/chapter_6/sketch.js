function setup() {
	colorMode(HSB, 255);
	let siz = windowWidth * pixelDensity();
	createCanvas(siz, siz / 3);
	background(0, 0, 0xff);

	translate(width / 2, height);
	let offset_y = height / 3;
	let step_x = 6 * 4;
	let start = step_x * 1;
	let stop = width - step_x * 1;
	for (let i = start; i <= stop; i += step_x) {
		stroke(163, 199, 244);
		new Branch(createVector(0, 0), offset_y, i, 0).draw(0);
		stroke(163, 199, 244);
		let switch_offset = (((i % (step_x * 2) == step_x) ? -1 : 1) * step_x * 0.5);
		line(-i / 2, -offset_y, -i / 2, -offset_y * 1.5);
		line(i / 2, -offset_y, i / 2, -offset_y * 1.5);
		line(-i / 2 - switch_offset, -offset_y * 2, -i / 2 - switch_offset, -height);
		line(i / 2 + switch_offset, -offset_y * 2, i / 2 + switch_offset, -height);

		let bezier_scale = height * 0.1;
		bezier(-1 * i / 2, -offset_y * 1.5,
			-1 * i / 2, -offset_y * 1.5 - bezier_scale,
			-1 * i / 2 - switch_offset, -offset_y * 2 + bezier_scale,
			-1 * i / 2 - switch_offset, -offset_y * 2);

		bezier(i / 2, -offset_y * 1.5,
			i / 2, -offset_y * 1.5 - bezier_scale,
			i / 2 + switch_offset, -offset_y * 2 + bezier_scale,
			i / 2 + switch_offset, -offset_y * 2);
	}
}
