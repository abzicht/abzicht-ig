class Branch {
  constructor(root = createVector(0, 0),
    scale_y = 10,
    max_width = width,
    generation = 0,
    max_generations = 10,
    from = color(163, 199, 244),
    to = color(163,0,0xff),
    orientation = -1) {

    this.root = root;
    this.scale_y = scale_y;
    this.max_width = max_width;
    this.generation = generation;
    this.max_generations = max_generations;
    this.from = from;
    this.to = to;
    this.orientation = orientation;
    this.target_left = this.root.copy();
    this.target_right = this.root.copy();
  }

  draw(children = 0) {
    let dist_x = this.max_width / 2;
    let dist_y = this.orientation * this.scale_y;
    this.target_left.x -= dist_x;
    this.target_left.y += dist_y;
    this.target_right.x += dist_x;
    this.target_right.y += dist_y;

    stroke(lerpColor(this.from, this.to, map(this.generation, 0, this.max_generations, 0, 1)));
    //stroke(163,map(this.generation,0,this.max_generations,199, 0x00),map(this.generation,0,this.max_generations,244, 0xff));
    strokeWeight(6);
    noFill();
    let bezier_scale = this.scale_y / (this.generation + 1);
    bezier(this.root.x, this.root.y, this.root.x, this.root.y - bezier_scale, this.target_right.x, this.target_right.y + bezier_scale, this.target_right.x, this.target_right.y);
    bezier(this.root.x, this.root.y, this.root.x, this.root.y - bezier_scale, this.target_left.x, this.target_left.y + bezier_scale, this.target_left.x, this.target_left.y);


    if (children > 0) {
      new Branch(this.target_left, this.scale_y * 0.9, this.max_width / 2, this.generation + 1, this.max_generations).draw(children - 1);
      new Branch(this.target_right, this.scale_y * 0.9, this.max_width / 2, this.generation + 1, this.max_generations).draw(children - 1);
    }
  }

}
