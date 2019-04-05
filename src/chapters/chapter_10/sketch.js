let windmills = [];
let airplanes = [];

function setup() {
  colorMode(HSB, 255);
  let siz = windowWidth * pixelDensity();
  createCanvas(siz, siz / 3);
  let blue = color(163, 199, 244);
  let white = color(163, 1, 0xff);
  background(blue);

  // drawStars();
  drawSky();
  noStroke();
  fill(40, 199, 244);
  circle(width, height, height / 1.5);
  resetMatrix();
}

let drawSky = function(){
  noStroke();
  let noiseScale = 0.01;
  for (let i = 0; i < 72; i++) {
      let x, y = 0;
      x = random() * width;
      y = height/10 + (random() * (height * 0.8));
      fill(255, 0, 255, height - y);
      let scale = noise(x * noiseScale, y * noiseScale);
      circle(x, y, 10 * scale);

  }
}

function drawStars(){
  noStroke();
  let noiseScale = 0.01;
  let resolution = 20;
  for (let y = 0; y < height; y+=resolution) {
    for (let x = 0; x < width; x+=resolution) {
      noiseDetail(2, 0.2);
      let noiseVal = noise(x * noiseScale, y * noiseScale);
      fill(255)
      circle(x, y, 20 * noiseVal);
    }
  }
}
