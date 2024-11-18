const zombieImage = new Image();
zombieImage.src = "./images/walkingdead.png";

class Zombie {
  constructor(x, y, speed, scale) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.scale = scale;
    this.width = 200 * scale;
    this.height = 312 * scale;
    this.frameIndex = 0;
    this.frameCount = 10;
    this.frameWidth = 200;
    this.frameHeight = 312;
  }

  draw(ctx) {
    const sx = this.frameIndex * this.frameWidth;
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

  update() {
    this.x -= this.speed;
  }

  updateFrame() {
    const now = new Date();
    this.frameIndex = Math.floor(now.getMilliseconds() / 100) % this.frameCount;
  }
}

const zombies = [];

function spawnZombie(canvas) {
  const x = canvas.width;
  const y = canvas.height - 400;
  const speed = Math.random() * 1.5 + 1;
  const scale = Math.random() * 0.5 + 0.5;
  zombies.push(new Zombie(x, y, speed, scale));
}

function drawZombies(ctx) {
  zombies.sort((a, b) => a.scale - b.scale);
  zombies.forEach((zombie) => zombie.draw(ctx));
}

function updateZombies() {
  zombies.forEach((zombie) => zombie.update());
}

export { Zombie, zombies, spawnZombie, updateZombies, drawZombies };
