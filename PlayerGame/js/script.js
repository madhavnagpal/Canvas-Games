const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const playerImage = document.getElementById("source");

const player = {
  w: 50,
  h: 50,
  x: 10,
  y: 150,
  dx: 0,
  dy: 0,
  speed: 2,
};

function drawPlayer() {
  player.x += player.dx;
  player.y += player.dy;
  detectCollision();
  ctx.drawImage(playerImage, player.x, player.y, player.w, player.h);
}
function detectCollision() {
  //walls
  //left
  if (player.x < 0) player.x = 0;
  //top
  if (player.y < 0) player.y = 0;
  //bottom
  if (player.y + player.h > canvas.height) player.y = canvas.height - player.h;
  //right
  if (player.x + player.w > canvas.width) {
    player.dx = 0;
    player.x = 0;
    alert("You Won ! Game restarts");
  }
  if (isCollided(e1) || isCollided(e2) || isCollided(e3)) {
    player.dx = 0;
    player.x = 0;
    alert("You Lost ! Game restarts");
  }
}

function isCollided(e) {
  let pt1 = {
    x: player.x,
    y: player.y,
  };
  let pt2 = {
    x: player.x + player.w,
    y: player.y,
  };
  let pt3 = {
    x: player.x,
    y: player.y + player.h,
  };
  let pt4 = {
    x: player.x + player.w,
    y: player.y + player.h,
  };
  if (
    pt1.x >= e.x &&
    pt1.x <= e.x + e.size &&
    pt1.y >= e.y &&
    pt1.y <= e.y + e.size
  )
    return true;
  if (
    pt2.x >= e.x &&
    pt2.x <= e.x + e.size &&
    pt2.y >= e.y &&
    pt2.y <= e.y + e.size
  )
    return true;
  if (
    pt3.x >= e.x &&
    pt3.x <= e.x + e.size &&
    pt3.y >= e.y &&
    pt3.y <= e.y + e.size
  )
    return true;
  if (
    pt4.x >= e.x &&
    pt4.x <= e.x + e.size &&
    pt4.y >= e.y &&
    pt4.y <= e.y + e.size
  )
    return true;
  return false;
}

class enemy {
  constructor(speed) {
    this.speed = speed;
    this.size = 50;
    this.y = 0;
  }
  moveEnemy() {
    this.y += this.speed;
    if (this.y < 0 || this.y + this.size > canvas.height) {
      this.speed = -this.speed;
    }
  }
}
function drawEnemy(e) {
  e.moveEnemy();
  ctx.fillStyle = "red";
  ctx.fillRect(e.x, e.y, e.size, e.size);
}

let e1 = new enemy(1);
let e2 = new enemy(2);
let e3 = new enemy(3);
e1.x = 150;
e2.x = 270;
e3.x = 390;

function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawEnemy(e1);
  drawEnemy(e2);
  drawEnemy(e3);
  requestAnimationFrame(game);
}
game();

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  if (e.key == "ArrowDown" || e.key == "Down") player.dy = player.speed;
  if (e.key == "ArrowUp" || e.key == "Up") player.dy = -player.speed;
  if (e.key == "ArrowLeft" || e.key == "Left") player.dx = -player.speed;
  if (e.key == "ArrowRight" || e.key == "Right") player.dx = player.speed;
}
function keyUp(e) {
  if (
    e.key == "ArrowDown" ||
    e.key == "Down" ||
    e.key == "ArrowUp" ||
    e.key == "Up" ||
    e.key == "ArrowLeft" ||
    e.key == "Left" ||
    e.key == "ArrowRight" ||
    e.key == "Right"
  ) {
    player.dx = 0;
    player.dy = 0;
  }
}
