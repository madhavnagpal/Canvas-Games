const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

// ball
let ball = {
  x: 0,
  y: 100,
  radius: 20,
  dx: 3,
  dy: 1,
};

//player
let player = {
  x: 10,
  y: height - 50,
  w: 150,
  h: 30,
  dx: 0,
};

function update() {
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  drawBall();
  drawPlayer();
  requestAnimationFrame(update);
}
update();

// drawing ball*********************************

function drawBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  //   walls;
  //   right;
  if (ball.x + ball.radius >= width) {
    ball.dx *= -1;
    ball.x = width - ball.radius;
  }
  //left
  if (ball.x - ball.radius < 0) {
    ball.dx *= -1;
    ball.x = ball.radius;
  }
  //top
  if (ball.y - ball.radius < 0) {
    ball.dy *= -1;
    ball.y = ball.radius;
  }

  //player hit
  if (
    ball.y + ball.radius >= player.y &&
    ((ball.x - ball.radius >= player.x &&
      ball.x - ball.radius <= player.x + player.w) ||
      (ball.x + ball.radius >= player.x &&
        ball.x + ball.radius <= player.x + player.w))
  ) {
    ball.dy *= -1;
  }
  if (ball.y + ball.radius >= height) {
    //bottom
    ball.x = 0;
    ball.y = 100;
    alert("You Lost \n Do You Want To Start A New Game");
    location.reload(true);
  }
  ctx.moveTo(ball.x + ball.radius, ball.y);
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#77d8d8";
  ctx.fill();
}

// ball drawing ends***************************

// draw player*********************************

function drawPlayer() {
  player.x += player.dx;
  if (player.x < 0) {
    player.dx *= -1;
    player.x = 0;
  }
  if (player.x + player.w > width) {
    player.dx *= -1;
    player.x = width - player.w;
  }

  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

document.addEventListener("keydown", movePlayer);
document.addEventListener("keyup", stopPlayer);

function movePlayer(e) {
  if (e.key == "ArrowRight" || e.key == "Right") {
    player.dx = 5;
  }
  if (e.key == "ArrowLeft" || e.key == "Left") {
    player.dx = -5;
  }
}
function stopPlayer(e) {
  if (
    e.key == "ArrowRight" ||
    e.key == "Right" ||
    e.key == "ArrowLeft" ||
    e.key == "Left"
  ) {
    player.dx = 0;
  }
}
// player drawn***************************************
