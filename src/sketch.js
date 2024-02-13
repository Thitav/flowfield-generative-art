let n, noise_scale, noise_strength, particles, color

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()
  background(0)

  // randomSeed(1)
  // noiseSeed(1)

  n = random(2000, 5000)
  noise_scale = random(10, 1000)
  noise_strength = random(1, 10)
  color = createVector(random(255), random(255), random(255))
  particles = [n]

  for (let i = 0; i < n; i++) {
    let new_pos = createVector(random(width), random(height), random(1, 5))
    let new_dir = createVector(cos(0), sin(0))
    let new_speed = random(1, 2)
    
    particles[i] = new Particle(new_pos, new_dir, new_speed);
  }
}

function draw() {
  fill(0, 10)
  rect(0, 0, windowWidth, windowHeight)
  
  for (let i = 0; i < n; i++) {
    particles[i].run()
  }
}

class Particle {
  constructor(pos, dir, speed) {
    this.pos = pos
    this.dir = dir 
    this.speed = speed
  }
  
  run() {
    let angle = noise(this.pos.x / noise_scale, this.pos.y / noise_scale, frameCount / noise_scale) * TWO_PI * noise_strength
    this.dir.x = cos(angle)
    this.dir.y = sin(angle)
    
    let vel = this.dir.copy()
    vel.mult(this.speed)
    this.pos.add(vel)
    
    if (this.pos.x <0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
      this.pos.x = random(width);
      this.pos.y = random(height);
    }
    
    fill(color.z, color.y, color.z)
    ellipse(this.pos.x, this.pos.y, this.pos.z)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
