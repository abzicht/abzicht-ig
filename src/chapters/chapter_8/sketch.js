function setup() {
  colorMode(HSB, 255);
  let siz = windowWidth * pixelDensity();
  createCanvas(siz, siz / 3);
  let blue = color(163, 199, 244);
  let white = color(163, 1, 0xff);

  draw_transition(blue, white, 2, 0, 1, false);
  resetMatrix();
  translate(width / 2, height * 2 + 6 * 2);
  stroke(blue);
  strokeWeight(6);
  let step = 6 * 4;
  draw_single_branches(step, step * 2, width - step);

  resetMatrix();
  translate(width / 2, height / 3);

  fill(white);
  let tree_size = step * 2 - 6;
  noStroke();
  let tree = new PythagorasTree(createVector(-tree_size / 2, tree_size / 2), createVector(tree_size / 2, tree_size / 2), 0, 14, 1.2, white, blue, false);
  tree.draw();

  strokeWeight(6 * 3);
  stroke(blue);
  line(0, height, 0, 0);
  stroke(white);
  line(step / 2, height, step / 2, 0);
  line(-step / 2, height, -step / 2, 0);


  resetMatrix();
  translate(0, height / 2);
  noStroke();
  draw_pythagoras_trees(blue, white);
  draw_pythagoras_trees(blue, white, width / 10, height * 0.02, -width / 20);
}

function draw_pythagoras_trees(from, to, resolution = width / 10, tree_size = height * 0.08, offset = 0) {
  for (let i = resolution + offset; i < width / 2; i += resolution) {
    let rdm = random(0.5, 1.2);
    for (let j of [-1, 1]) {
      resetMatrix();
      translate(j * i + width / 2, height / 2);
      new PythagorasTree(createVector(-tree_size / 2 * rdm, 0), createVector(tree_size / 2 * rdm, 0), 0, 10 * rdm, 1, from, to, true).draw();
      translate(0, -height / 2);
      rotate(PI);
      new PythagorasTree(createVector(-tree_size / 3, 0), createVector(tree_size / 3, 0), 0, 10, 1, to, from, false).draw();
    }
  }
}

class PythagorasTree {
  constructor(loc_1, loc_2, order, iterations, angle, from, to, rnd = false) {
    this.loc_1 = loc_1.copy();
    this.loc_2 = loc_2.copy();
    this.order = order;
    this.iterations = iterations;
    this.angle = angle;
    this.rnd = rnd;
    this.from = from;
    this.to = to;
  }

  draw() {
    if (this.order >= this.iterations) {
      return;
    }

    let d = createVector(this.loc_2.x - this.loc_1.x, this.loc_1.y - this.loc_2.y);
    let loc_3 = createVector(this.loc_1.x - d.y, this.loc_1.y - d.x);
    var loc_4 = createVector(this.loc_2.x - d.y, this.loc_2.y - d.x);

    fill(lerpColor(this.from, this.to, this.order / this.iterations));
    beginShape();
    vertex(this.loc_1.x, this.loc_1.y);
    vertex(this.loc_2.x, this.loc_2.y);
    vertex(loc_4.x, loc_4.y);
    vertex(loc_3.x, loc_3.y);
    endShape(CLOSE);

    let v = createVector(0, 0);
    if (this.rnd == true) {
      v.x = (loc_3.x + loc_4.x) / 2 - (d.y / 2 * this.angle * random(0.5, 1.2));
      v.y = (loc_3.y + loc_4.y) / 2 - (d.x / 2 * this.angle * random(0.5, 1.2));
    } else {
      v.x = (loc_3.x + loc_4.x) / 2 - (d.y / 2 * this.angle);
      v.y = (loc_3.y + loc_4.y) / 2 - (d.x / 2 * this.angle);

    }

    new PythagorasTree(loc_3, v, this.order + 1, this.iterations, this.angle, this.from, this.to, this.rnd).draw();
    new PythagorasTree(v, loc_4, this.order + 1, this.iterations, this.angle, this.from, this.to, this.rnd).draw();

  }
}