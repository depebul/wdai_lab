import {
  Zombie,
  zombies,
  spawnZombie,
  updateZombies,
  drawZombies,
} from "./zombie.js";

window.onload = function () {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const backgroundImage = new Image();
  const crosshairImage = new Image();
  const fullHeartImage = new Image();
  const emptyHeartImage = new Image();
  const modal = document.getElementById("myModal");
  const resetButton = document.getElementById("resetButton");
  const gameOverMusic = document.getElementById("gameOverMusic");

  let livesLeft;
  let currentScore;
  let mouseX = 0;
  let mouseY = 0;
  let animationFrameId;
  let zombieSpawnIntervalId;

  backgroundImage.src = "./images/board-bg.jpg";
  crosshairImage.src = "./images/aim.png";
  fullHeartImage.src = "./images/full_heart.png";
  emptyHeartImage.src = "./images/empty_heart.png";

  backgroundImage.onload = function () {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  };

  function drawHearts(fullHearts) {
    const heartWidth = canvas.width * 0.07;
    const heartHeight = canvas.width * 0.07;
    const heartSpacing = canvas.width * 0.02;

    for (let i = 0; i < 3; i++) {
      const x = i * (heartWidth + heartSpacing) + 50;
      const y = 50;

      if (i < fullHearts) {
        ctx.drawImage(fullHeartImage, x, y, heartWidth, heartHeight);
      } else {
        ctx.drawImage(emptyHeartImage, x, y, heartWidth, heartHeight);
      }
    }
  }

  function drawScore(score) {
    const scoreText = score.toString().padStart(5, "0");
    const x = canvas.width - 370;
    const y = 140;
    ctx.font = "110px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(scoreText, x, y);
  }

  canvas.addEventListener("mousemove", function (event) {
    mouseX = event.clientX - canvas.offsetLeft;
    mouseY = event.clientY - canvas.offsetTop;
  });

  function isPointInRect(x, y, rect) {
    return (
      x >= rect.x &&
      x <= rect.x + rect.width &&
      y >= rect.y &&
      y <= rect.y + rect.height
    );
  }

  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let clickedOnZombie = false;

    for (let i = zombies.length - 1; i >= 0; i--) {
      if (isPointInRect(mouseX, mouseY, zombies[i])) {
        clickedOnZombie = true;
        currentScore += 20;
        zombies.splice(i, 1);
      }
    }

    if (!clickedOnZombie) {
      currentScore -= 5;
    }
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    drawHearts(livesLeft);
    drawScore(currentScore);

    updateZombies();
    drawZombies(ctx);
    const crosshairWidth = canvas.width * 0.2;
    const crosshairHeight = canvas.width * 0.2;

    ctx.drawImage(
      crosshairImage,
      mouseX - crosshairWidth / 2,
      mouseY - crosshairHeight / 2,
      crosshairWidth,
      crosshairHeight
    );

    for (let i = zombies.length - 1; i >= 0; i--) {
      if (zombies[i].x + zombies[i].width < 0) {
        zombies.splice(i, 1);
        livesLeft -= 1;
        if (livesLeft <= 0) {
          cancelAnimationFrame(animationFrameId);
          clearInterval(zombieSpawnIntervalId);
          showGameOverModal();
          return;
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  function showGameOverModal() {
    modal.style.display = "flex";
    gameOverMusic.play();
  }

  function resetGame() {
    livesLeft = 3;
    currentScore = 0;
    zombies.length = 0;

    animationFrameId = requestAnimationFrame(animate);
    zombieSpawnIntervalId = setInterval(() => spawnZombie(canvas), 2000);
  }

  document.querySelector(".close").onclick = function () {
    modal.style.display = "none";
  };

  resetButton.onclick = function () {
    modal.style.display = "none";
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;
    resetGame();
  };

  resetGame();
};
