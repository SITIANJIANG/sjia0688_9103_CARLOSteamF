let allCircles = [];  
let lines = [];       
let generateBtn;      
let playBtn;          
let sound;            
let fft;              
let noiseScale = 0.02;  
let noiseAmplitude = 10; // 放大噪声影响

function preload() {
  sound = loadSound("/red_velvet_dumb_dumb.mp3");
}

function setup() {
  createCanvas(600, 800);
  drawBackground();

  lines = [
    {x1: 0, y1: -340, x2: 0, y2: 0},
    {x1: -120, y1: -250, x2: 130, y2: -250},
    {x1: -135, y1: -430, x2: -120, y2: -250},
    {x1: 130, y1: -420, x2: 130, y2: -250},
    {x1: -54, y1: -340, x2: 54, y2: -340},
    {x1: -54, y1: -340, x2: -54, y2: -380},
    {x1: 54, y1: -340, x2: 54, y2: -370},
    {x1: -100, y1: 0, x2: 100, y2: 0},
    {x1: -220, y1: -410, x2: -135, y2: -430},
    {x1: 130, y1: -420, x2: 180, y2: -421},
    {x1: 180, y1: -421, x2: 190, y2: -520},
    {x1: -220, y1: -410, x2: -220, y2: -440},
  ];
 
  generateBtn = createButton('🌲 Generate Apple Tree 🍎');
  generateBtn.position(80, 700);
  generateBtn.mousePressed(drawApple);
  styleButton(generateBtn);

  playBtn = createButton('▶️ Play/Pause Music');
  playBtn.position(350, 700);
  playBtn.mousePressed(toggleSound);
  styleButton(playBtn);

  fft = new p5.FFT();
}

function styleButton(btn) {
  btn.style('background-color', '#FFB6B9');
  btn.style('color', '#ffffff');
  btn.style('font-size', '16px');
  btn.style('padding', '10px 20px');
  btn.style('border', 'none');
  btn.style('border-radius', '12px');
  btn.style('cursor', 'pointer');
  btn.style('box-shadow', '2px 2px 8px rgba(0, 0, 0, 0.2)');
  btn.style('transition', 'all 0.3s ease-in-out');
  btn.style('font-family', 'Helvetica, sans-serif');
  btn.mouseOver(() => btn.style('background-color', '#ff9aa2'));
  btn.mouseOut(() => btn.style('background-color', '#FFB6B9'));
}

function drawBackground() {
  background(199, 244, 255);
  noStroke();
  fill('#7E94BE');
  rect(37, 35, 525, 718, 20);
  push();
  translate(width / 2, height / 2 + 200);
  fill('#65C18D');
  stroke('#373A7D');
  strokeWeight(2);
  rect(-262, 0, 523, 86);
  fill('#FFF28C');
  noStroke();
  rect(-115, 0, 225, 70);
  pop();
}

function drawApple() {
  drawBackground();
  allCircles = [];
  push();
  translate(width / 2, height / 2 + 200);
  for (let lineSegment of lines) {
    drawCirclesOnLine(lineSegment.x1, lineSegment.y1, lineSegment.x2, lineSegment.y2, allCircles);
  }
  stroke(234, 204, 70);
  strokeWeight(2);
  for (let lineSegment of lines) {
    line(lineSegment.x1, lineSegment.y1, lineSegment.x2, lineSegment.y2);
  }
  pop();
}

function drawCirclesOnLine(x1, y1, x2, y2, allCircles) {
  let len = dist(x1, y1, x2, y2);
  let dx = (x2 - x1) / len;
  let dy = (y2 - y1) / len;
  let pos = 0;

  while (pos < len) {
    let r = random(15, 40);
    let cx = x1 + dx * (pos + r);
    let cy = y1 + dy * (pos + r);

    if (pos + r * 2 > len) {
      let remaining = len - pos;
      r = remaining / 2;
      if (r < 3) break;
      cx = x1 + dx * (pos + r);
      cy = y1 + dy * (pos + r);
    }

    let overlapping = false;
    for (let c of allCircles) {
      if (dist(cx, cy, c.x, c.y) < (r + c.r) * 0.8 && !isNearIntersection(cx, cy)) {
        overlapping = true;
        break;
      }
    }

    while (overlapping) {
      r = r * 0.9;
      if (r < 20) {
        overlapping = false;
        break;
      }
      cx = x1 + dx * (pos + r);
      cy = y1 + dy * (pos + r);
      overlapping = false;
      for (let existingCircle of allCircles) {
        let distance = dist(cx, cy, existingCircle.x, existingCircle.y);
        let minDistance = r + existingCircle.r;
        if (distance < minDistance * 0.9) {
          let isIntersection = isNearIntersection(cx, cy);
          if (!isIntersection) {
            overlapping = true;
            break;
          }
        }
      }
    }

    if (!overlapping) {
      let angle = atan2(dy, dx);
      let isRedFirst = random() > 0.5;
      let color1 = isRedFirst ? [232, 80, 78] : [120, 161, 100];
      let color2 = isRedFirst ? [120, 161, 100] : [232, 80, 78];
      allCircles.push({
        x: cx,
        y: cy,
        r: r,
        angle: angle,
        color1,
        color2,
        noiseSeedX: random(1000),
        noiseSeedY: random(1000)
      });
    }
    pos += r * 2 - 2;
  }
}

function isNearIntersection(x, y) {
  let threshold = 10;
  let intersections = [
    {x: 0, y: 0}, {x: 0, y: -340}, {x: -120, y: -250}, {x: 130, y: -250},
    {x: -54, y: -340}, {x: 54, y: -340}, {x: -135, y: -430}, {x: 130, y: -420},
    {x: 180, y: -421}, {x: -220, y: -410}, {x: -54, y: -380}, {x: 54, y: -370},
    {x: 190, y: -520}, {x: -220, y: -440}, {x: -100, y: 0}, {x: 100, y: 0}
  ];
  for (let p of intersections) {
    if (dist(x, y, p.x, p.y) < threshold) return true;
  }
  return false;
}

function toggleSound() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}

function draw() {
  drawBackground();
  let spectrum = fft.analyze();
  let lowEnergy = fft.getEnergy(20, 200);
  let t = map(lowEnergy, 0, 255, 0, 1);

  push();
  translate(width / 2, height / 2 + 200);
  noStroke();

  for (let c of allCircles) {
    let offsetX = noise(frameCount * noiseScale + c.noiseSeedX) * noiseAmplitude * 2 - noiseAmplitude;
    let offsetY = noise(frameCount * noiseScale + c.noiseSeedY) * noiseAmplitude * 2 - noiseAmplitude;

    let from1 = color(...c.color1);
    let to1 = color(...c.color2);
    let lerped1 = lerpColor(from1, to1, t);

    let from2 = color(...c.color2);
    let to2 = color(...c.color1);
    let lerped2 = lerpColor(from2, to2, t);

    fill(lerped1);
    arc(c.x + offsetX, c.y + offsetY, c.r * 2, c.r * 2, c.angle, c.angle + PI);
    fill(lerped2);
    arc(c.x + offsetX, c.y + offsetY, c.r * 2, c.r * 2, c.angle + PI, c.angle + TWO_PI);
  }

  stroke(234, 204, 70);
  strokeWeight(2);
  for (let lineSegment of lines) {
    line(lineSegment.x1, lineSegment.y1, lineSegment.x2, lineSegment.y2);
  }
  pop();
}
