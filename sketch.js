// Aaraiz Afridi
// CS30 Major Project

let player;
let platform;
const WORLD_GRAVITY = 9.8;
let canJump = true;

function setup() {
  new Canvas(windowWidth, windowHeight);
  world.gravity.y = WORLD_GRAVITY;

  mainCharacter();
  thePlatform();
}

function draw() {
  background(255);
  theCamera();
  playerMovement();
}

function mainCharacter() {
  player = new Sprite(width/2, height/2, 20);
  player.color = "green";
}

//remove this stuff
function thePlatform(x, y, wid, hei) {
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
  camera.x = player.x;
  camera.y = player.y;
}