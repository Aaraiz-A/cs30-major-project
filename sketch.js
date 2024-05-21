// Aaraiz Afridi
// CS30 Major Project

let player;
let platform;
let mainCharacterGun;
const WORLD_GRAVITY = 9.8;
let canJump = true;
let bullets = [];


function setup() {
  new Canvas(600, 600);
  world.gravity.y = WORLD_GRAVITY;

  mainCharacter();
  thePlatforms();
  theGunCharacteristics();
}

function draw() {
  background(155);
  theCamera();
  playerMovement();
  theGunBehaviour();
  shootyShoot();
}

function mainCharacter() {
  player = new Sprite(width/2, height/2, 20);
  player.color = "green";
}

function theGunCharacteristics() {
  mainCharacterGun = new Sprite(width/2, height/2, 20, 10);
  mainCharacterGun.mass = 0;
}

//remove this stuff
function thePlatforms() {
  platform = new Sprite(width/2, height/2 + 50, 100, 20, "static");
  platform.color = "red";
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
    let angle = atan2(mouse.y - mainCharacterGun.y, mouse.x - mainCharacterGun.x);
    let bullet = new Sprite(mainCharacterGun.x, mainCharacterGun.y, 6);
    bullet.color = "black";
    bullet.vel.x = 10 * cos(angle);
    bullet.vel.y = 10 * sin(angle);
    bullets.push(bullet);
  }
}
