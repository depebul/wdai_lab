// Load the zombie sprite sheet
const zombieImage = new Image();
zombieImage.src = "./images/walkingdead.png"; // Update with the correct path to your sprite sheet

// Define the Zombie class
class Zombie {
  constructor(x, y, speed, scale) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.scale = scale;
    this.width = 200 * scale; // Width of each frame scaled
    this.height = 312 * scale; // Height of each frame scaled
    this.frameIndex = 0; // Current frame index
    this.frameCount = 10; // Total number of frames
    this.frameWidth = 200; // Width of each frame in the sprite sheet
    this.frameHeight = 312; // Height of each frame in the sprite sheet
  }

  // Draw the zombie on the canvas
  draw(ctx) {
    const sx = this.frameIndex * this.frameWidth; // Source x position in the sprite sheet
    ctx.drawImage(
      zombieImage,
      sx,
      0,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.updateFrame();
  }

  // Update the zombie's position
  update() {
    this.x -= this.speed;
  }

  // Update the frame index for animation
  updateFrame() {
    const now = new Date();
    this.frameIndex = Math.floor(now.getMilliseconds() / 100) % this.frameCount;
  }
}

// Initialize zombies array
const zombies = [];

// Function to spawn a new zombie
function spawnZombie(canvas) {
  const x = canvas.width;
  const y = canvas.height - 400; // Fixed y position
  const speed = Math.random() * 1.5 + 1; // Random speed between 0.5 and 1.5
  const scale = Math.random() * 0.5 + 0.5; // Random scale between 0.5 and 1
  zombies.push(new Zombie(x, y, speed, scale));
}

// Function to draw all zombies
function drawZombies(ctx) {
  // Sort zombies by scale in ascending order
  zombies.sort((a, b) => a.scale - b.scale);
  zombies.forEach((zombie) => zombie.draw(ctx));
}

// Function to update all zombies
function updateZombies() {
  zombies.forEach((zombie) => zombie.update());
}

export { Zombie, zombies, spawnZombie, updateZombies, drawZombies };
