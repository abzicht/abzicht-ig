function draw_curve(vect, start, stop, width, height = null, fill_ = false) {
	if (fill_ == false) {
		noFill();
	}
	if (height == null) {
		height = width;
	}
	arc(vect.x, vect.y, width / 2, height / 2, map(start, 0, 1, 0, TWO_PI), map(stop, 0, 1, 0, TWO_PI));
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


function draw_single_branches(step_x = 6 * 4, start = null, stop = null) {
	if (start == null) {
		start = step_x;
	}
	if (stop == null) {
		stop = width - step_x * 1;
	}
	for (let i = start; i <= stop; i += step_x) {
		let switch_offset = (((i % (step_x * 2) == step_x) ? -1 : 1) * step_x * 0.5);
		let height_offset = -height * map(i, start, stop, 1.5, 0);
		line(-i / 2 - switch_offset, 0, -i / 2 - switch_offset, height_offset);
		line(i / 2 + switch_offset, 0, i / 2 + switch_offset, height_offset);
		let radius = step_x * 2;
		let left_vec = createVector(-i / 2 - switch_offset - radius / 4, height_offset);
		let right_vec = createVector(i / 2 + switch_offset + radius / 4, height_offset);
		draw_curve(left_vec, 0.75, 1, radius, radius);
		draw_curve(right_vec, 0.5, 0.75, radius, radius);
		line(left_vec.x, left_vec.y - radius / 4, -width / 2, left_vec.y - radius / 4);
		line(right_vec.x, right_vec.y - radius / 4, width / 2, right_vec.y - radius / 4);
	}
}

function draw_transition(from, to, resolution, start = 0, stop = 1, random_ = true) {
	let start_x = map(start, 0, 1, 0, width);
	let start_y = map(start, 0, 1, 0, height);
	let stop_x = map(stop, 0, 1, 0, width);
	let stop_y = map(stop, 0, 1, 0, height);
	noStroke();
	for (let i = start_y; i < stop_y; i += resolution) {
		for (let j = start_x; j < stop_x; j += resolution) {
			let percentage_y = map(i, start_y, stop_y, 0, 1);
			let value = percentage_y;
			if (random_) {
				value -= random(0.3 * (1 - percentage_y));
			}
			fill(lerpColor(from, to, value));
			rect(j, i, resolution, resolution);
		}
	}
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

function mandelbrot(vect, iterations) {
	var orig_vect = vect.copy();
	var i = 0;
	while (i < iterations) {
		var temp_x = vect.x ** 2 - vect.y ** 2;
		var temp_y = 2 * vect.x * vect.y;

		vect.x = temp_x + orig_vect.x;
		vect.y = temp_y + orig_vect.y;

		if (vect.x ** 2 + vect.y ** 2 > 4) {
			return i;
		}
		i++;
	}
	return -1;
}
