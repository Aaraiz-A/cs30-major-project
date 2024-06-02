// Aaraiz Afridi
// CS30 Major Project

let player;
let enemy1;
let platform;
let mainCharacterGun;
const WORLD_GRAVITY = 9.8;
const ENEMY1_SPEED = 3;
let canJump = true;
let bullets = [];
let platforms = [];
let dist1;
let playerHealth = 100;


function setup() {
  new Canvas(600, 600);
  world.gravity.y = WORLD_GRAVITY;

  mainCharacter();
  theEnemy1();
  theGunCharacteristics();
  thePlatforms();
}

function draw() {
  background(155);
  theCamera();
  playerMovement();
  theGunBehaviour();
  shootyShoot();
  updateBullet();
  theEnemy1Behaviour();
  drawHealthBar();
  gameOver();
}

function mainCharacter() {
  player = new Sprite(width/2, height/2, 20);
  player.color = "green";
}

function theEnemy1() {
  let x
  let y;
  let distance;
  
  x = random(0, width);
  y = random(0, height/2);
  distance = dist(x, y, player.x, player.y);
  
  while (distance < 100) {
    x = random(0, width);
    y = random(0, height/2);
    distance = dist(x, y, player.x, player.y);
  }
  
  enemy1 = new Sprite(x, y, 20);
  enemy1.color = "black";
}

function theEnemy1Behaviour() {
  enemy1.moveTo(player, ENEMY1_SPEED);
  if (enemy1.collides(player)) {
    playerHealth -= 10;
    enemy1.remove();
    theEnemy1();
  }
}

function theGunCharacteristics() {
  mainCharacterGun = new Sprite(width/2, height/2, 20, 10);
  mainCharacterGun.mass = 0;
}

function playerMovement() {
  if (canJump) {
    if (kb.presses("w") && player.colliding(platform)) {
      player.vel.y = -4;
      canJump = false;
    }
  }
  if (player.collides(platform)) {
    canJump = true;
  }
  if (kb.pressing("d")) {
    player.vel.x = 5;
  }
  else if (kb.pressing("a")) {
    player.vel.x = -5;
  }
  else {
    player.vel.x = 0;
  }
}

function thePlatforms() {
  platform = new Sprite(width/2, height/2 + 50, 100, 20, "static");
  platform.color = "red";
}

function theCamera() {
  // camera.x = mouseX;
  // camera.y = mouseY;

  camera.x = player.x;
  camera.y = player.y;
}

function theGunBehaviour() {
  mainCharacterGun.rotateTowards(mouse, 0.1, 0);
  mainCharacterGun.x = player.x;
  mainCharacterGun.y = player.y;
}

function shootyShoot() {
  if (mouse.presses()) {
    let angle = mainCharacterGun.rotation;
    let bullet = new Sprite(mainCharacterGun.x, mainCharacterGun.y, 6);
    bullet.color = "black";
    let speed = 8;
    bullet.vel.x = speed * cos(angle);
    bullet.vel.y = speed * sin(angle);
    bullets.push(bullet);
  }
}

function updateBullet() {
  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    bullet.x += bullet.vel.x;
    bullet.y += bullet.vel.y;

    if (bullet.collides(enemy1)) {
      bullet.remove();
      bullets.splice(i, 1);
      i--;

      enemy1.remove();
      enemy1 = null;

      theEnemy1();
    }
  }
}

function drawHealthBar() {
  fill(255, 0, 0);
  rect(20, 40, playerHealth, 10); 
  fill(0, 255, 0);
  rect(20, 40, playerHealth, 10, 5);
}

function gameOver() {
  if (playerHealth <= 0) {
    noLoop();
  }
} 