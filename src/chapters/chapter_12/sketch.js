
function setup() {
  colorMode(HSB, 255);
  let siz = windowWidth * pixelDensity();
  createCanvas(siz, siz / 3);
  let grey = color(0,0,200);
  let dark_grey = color(0,0,100);
  background(0);
  let startpoint = createVector(height * 2/3, height);
  stroke(dark_grey);
  strokeWeight(startpoint.x/60);
  line(startpoint.x, startpoint.y, startpoint.x, 0);
  meteorites();
  noLoop();
}

function meteorites(){
  fill(255);
  noStroke();
  translate(width/2,height/2);
  curve(-300, 900,  0, 0,  0, 0,  300, 900);
  // beginShape();
  // curveVertex(0,0);
  // curveVertex(0,0);
  // curveVertex(0,0);
  // curveVertex(10, 100);
  // curveVertex(-10, 100);
  // curveVertex(0,0);
  // curveVertex(0,0);
  // endShape();
  for (let i = 0; i< 100; i++){

  }
}

function ceiling(){
  let scale = height * 100;
  let offset = height / 4;
  fill(0,0x0,100);
  noStroke();
  circle(width/2, scale - offset, scale);
  fill(0);
  stroke(0,0,100);
  circle(width/2, offset + scale, scale);
}
