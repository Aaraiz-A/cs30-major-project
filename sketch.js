// Aaraiz Afridi
// CS30 Major Project

let player;
let platform;
const WORLD_GRAVITY = 9.8;

function setup() {
  new Canvas(windowWidth, windowHeight);
  world.gravity.y = WORLD_GRAVITY;

  mainCharacter();
  thePlatform();

}

function draw() {
  background(255);
  theCamera();
  theJump();
}

function mainCharacter() {
  player = new Sprite(width/2, height/2, 20);
  player.color = "green";
}

function thePlatform() {
  platform = new Sprite(width/2, height/2 + 50, 100, 20, "static");
  platform.color = "red";
}

function theJump() {
  if (kb.presses("w")) {
    player.vel.y = -4;
  }

}

function theCamera() {
  camera.x = player.x;
  camera.y = player.y;
}