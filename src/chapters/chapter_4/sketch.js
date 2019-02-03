function setup() {
  colorMode(HSB, 255);
  let siz = windowWidth * pixelDensity();
  createCanvas(siz, siz / 3);
  background(4, 199, 244);
  let iterations = 60;



  resetMatrix();
  translate(width / 6, height / 2);
  draw_mandelbrot(iterations, 1.5, createVector(-0.5, 0));
  draw_vert_line(-height/3,height/2);

  resetMatrix();
  translate(width - width / 6, height / 2);
  draw_mandelbrot(iterations, 1.5, createVector(-0.5, 0));
  draw_vert_line(-height/3,height/2);


  resetMatrix();
  translate(width / 2, height / 2);
  draw_mandelbrot(iterations, 1.5, createVector(-0.5, 0), -1);
  draw_vert_line(-height/2,height/2);
}

function draw_mandelbrot(iterations, scale, offset = createVector(0, 0), x_mirror = 1, x_bounds = {
  start: -width/6,
  stop: width/6
}) {
  strokeWeight(1);
  let vect = createVector(0, 0);
  for (vect.x = x_bounds.start; vect.x < x_bounds.stop; vect.x++) {
    for (vect.y = -height / 2; vect.y < height / 2; vect.y++) {
      let scaled_vect = offset.copy();
      scaled_vect.x += map(vect.y, -height / 2, height / 2, -scale, scale);
      scaled_vect.y += x_mirror * map(vect.x, -width / 2, width / 2, -scale * 3, scale * 3);
      let c = mandelbrot(scaled_vect, iterations);
      if (c == -1) {
        stroke(0, 0, 0xff);
      } else {
        stroke(map(c, 0, iterations, 0, 0xff), 199, 244);
      }
      point(vect.x, vect.y);
    }
  }
}

function draw_vert_line(start, stop){
  let step = 1;
  strokeWeight(6);
  noFill();
  for(let i = start; i<=stop;i+= step){
    let c = abs(cos(map(i,start,stop,0,TWO_PI)));
    stroke(0,0,0xff);//, c*0xff);
    line(0,i,0,i+step);
  }
}
