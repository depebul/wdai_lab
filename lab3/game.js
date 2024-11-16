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

  backgroundImage.src = "./images/board-bg.jpg"; // Replace with the path to your background image
  crosshairImage.src = "./images/aim.png"; // Replace with the path to your crosshair image
  fullHeartImage.src = "./images/full_heart.png"; // Replace with the path to your good heart image
  emptyHeartImage.src = "./images/empty_heart.png"; // Replace with the path to your lost heart image

  backgroundImage.onload = function () {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  };

  function drawHearts(fullHearts) {
    const heartWidth = canvas.width * 0.07; // 7% of canvas width
    const heartHeight = canvas.width * 0.07; // 7% of canvas height
    const heartSpacing = canvas.width * 0.02; // 2% of canvas width

    // Draw three hearts based on the number of full hearts
    for (let i = 0; i < 3; i++) {
      const x = i * (heartWidth + heartSpacing) + 50;
      const y = 50; // Distance from the top

      if (i < fullHearts) {
        ctx.drawImage(fullHeartImage, x, y, heartWidth, heartHeight);
      } else {
        ctx.drawImage(emptyHeartImage, x, y, heartWidth, heartHeight);
      }
    }
  }

  // Function to draw the score
  function drawScore(score) {
    const scoreText = score.toString().padStart(5, "0"); // Ensure the score is 5 digits
    const x = canvas.width - 370; // Position from the right
    const y = 140; // Position from the top
    ctx.font = "110px Arial"; // Increase the font size to 30px
    ctx.fillStyle = "white";
    ctx.fillText(scoreText, x, y);
  }

  canvas.addEventListener("mousemove", function (event) {
    mouseX = event.clientX - canvas.offsetLeft;
    mouseY = event.clientY - canvas.offsetTop;
  });

  // Function to check if a point is inside a rectangle
  function isPointInRect(x, y, rect) {
    return (
      x >= rect.x &&
      x <= rect.x + rect.width &&
      y >= rect.y &&
      y <= rect.y + rect.height
    );
  }

  // Add event listener for mouse clicks
  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let clickedOnZombie = false;

    for (let i = zombies.length - 1; i >= 0; i--) {
      if (isPointInRect(mouseX, mouseY, zombies[i])) {
        clickedOnZombie = true;
        currentScore += 20;
        zombies.splice(i, 1); // Remove this zombie
      }
    }

    if (!clickedOnZombie) {
      currentScore -= 5;
    }
  });

  // Main animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Redraw the hearts and score
    drawHearts(livesLeft);
    drawScore(currentScore);

    // Update and draw zombies
    updateZombies();
    drawZombies(ctx);

    // Define the desired width and height for the crosshair
    const crosshairWidth = canvas.width * 0.2; // 20% of canvas width
    const crosshairHeight = canvas.width * 0.2; // 20% of canvas height

    // Draw the crosshair at the mouse position with the new size
    ctx.drawImage(
      crosshairImage,
      mouseX - crosshairWidth / 2,
      mouseY - crosshairHeight / 2,
      crosshairWidth,
      crosshairHeight
    );

    for (let i = zombies.length - 1; i >= 0; i--) {
      if (zombies[i].x + zombies[i].width < 0) {
        zombies.splice(i, 1); // Remove the zombie
        livesLeft -= 1; // Decrease lives
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
    zombies.length = 0; // Clear the zombies array

    // Restart the animation and zombie spawning
    animationFrameId = requestAnimationFrame(animate);
    zombieSpawnIntervalId = setInterval(() => spawnZombie(canvas), 2000);
  }

  // When the user clicks on <span> (x), close the modal
  document.querySelector(".close").onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks on the reset button, reset the game
  resetButton.onclick = function () {
    modal.style.display = "none";
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;
    resetGame();
  };

  // Start the game
  resetGame();
};
