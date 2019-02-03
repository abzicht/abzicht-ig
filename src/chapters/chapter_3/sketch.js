function draw_grid(start=0, stop = height, res = 20){
  stroke(0,0,0x00);
  function draw_line(x, y, angle=1, size = res/4){
    let x_1 = x - (size/2);
    let y_1 = y + (size/2) * angle;
    let x_2 = x + (size/2);
    let y_2 = y + (size/2) * angle * -1;
    line(x_1,y_1,x_2,y_2);
  }
  for(let i = start; i <= stop+res; i+=res){
    let scale = map(cos(((i-start)/(stop-start))*TWO_PI),-1,1,res/2,0);
    for(let j = 0; j <= width+res; j+=res){
      if(j/res % 2 == 0){
        draw_line(j,i+res/2, 1, scale);
        draw_line(j-res,i+res/2, 1, scale);
      } else {
        draw_line(j+res/2,i, -1, scale);
        draw_line(j-res/2,i, -1, scale);
      }
    }
  }
}


function draw_all_connections(scale_x = width / 3, scale_y = height, res = 0.4) {
  function draw_circle(x = 0, y = 0, radius = 20) {
    fill(45 / 360 * 255, 248, 255);
    fill(0,0, 255);
    noStroke();
    circle(x, y, radius);
  }

  function draw_connection(scale_x, scale_y, hue) {
    strokeWeight(6);
    stroke(hue, 0xff, 0xff);
    noFill();
    curve(scale_x / 3,scale_y, 0, 0, scale_x, 0, 2 * scale_x / 3, -scale_y);
  }
  let max = 3.8;
  for (let i = -max; i <= max; i += res) {
    draw_connection(scale_x, i * scale_y, abs(i)/(max)*40);
  }
  let radius = scale_x / 40;
  draw_circle(0, 0, radius);
  draw_circle(scale_x, 0, radius);
}

function setup() {
  colorMode(HSB, 255);
  let siz = windowWidth*pixelDensity();
  createCanvas(siz, siz/3);
  background(4, 199, 244);

  draw_grid();

  let to = color(4, 199, 244);
  let from = color(0x00, 0x00, 0x21);
  let radius = width / 1.5;

  stroke(0,0,0xff);
  strokeWeight(6);

  translate(width / 3, height);
  line(-radius/4,0,-radius/4,-height);
  draw_curve(createVector(0, 0), 0.5, 0.75, radius, radius);
  resetMatrix();

  translate(width / 3, 0);
  draw_curve(createVector(0, 0), 0.0, 0.25, radius, radius);
  resetMatrix();

  translate(width - width / 3, 0);
  draw_curve(createVector(0, 0), 0.25, 0.0, radius, radius);
  resetMatrix();

  translate(width - width / 3, 0);
  draw_curve(createVector(0, 0), 0.0, 0.25, radius, radius);
  resetMatrix();

  translate(width / 3, height / 2);
  draw_all_connections(width / 3, height*1.2, 0.45);
  resetMatrix();

  noLoop();
}
