// Aaraiz Afridi
// CS30 Major Project

let player;
let platforms = [];
let mainCharacterGun;
const WORLD_GRAVITY = 9.8;
let canJump = true;
let bullets = [];
let level;

class Platform {
  constructor(x, y, w, h) {
    this.sprite = new Sprite(x, y, w, h, "static");
    this.sprite.color = "red";
  }
}

class Level {
  constructor () {
    this.platforms = [];
    this.boundaries = {
      left: new Sprite(-100, height/2, 100, height),
      right: new Sprite(width + 100, height /2, 100, height),
      top: new Sprite(width/2, -100, width, 100),
      bottom: new Sprite(width/2, height + 100, width, 100)
    };

    this.platforms.push(new Platform(50, 500, 100, 20));
    this.platforms.push(new Platform(350, 300, 100, 20));
    this.platforms.push(new Platform(550, 500, 100, 20));
  }

  draw() {
    for (let i = 0; i < this.platforms.length; i++) {
      this.platforms[i].sprite.draw();
    }

    for (let boundary in this.boundaries) {
      this.boundaries[boundary].draw();
    }
  }

  collides(sprites) {
    for (let i = 0; i < this.platforms.length; i++) {
      if (this.platforms[i].sprite.collides(sprite)) {
        return true;
      }
    }
    for (let boundary in this.boundaries) {
      if (this.boundaries[boundary].collides(sprite)) {
        return true;
      }
    }

    return false;
  }
}


function setup() {
  new Canvas(600, 600);
  world.gravity.y = WORLD_GRAVITY;

  mainCharacter();
  theGunCharacteristics();
  level = new Level();
}

function draw() {
  background(155);
  theCamera();
  playerMovement();
  theGunBehaviour();
  shootyShoot();
  updateBullet();

  level.draw();

  if (level.collides(player)) {
    canJump = true;
  }
}

function mainCharacter() {
  player = new Sprite(width/2, height/2, 20);
  player.color = "green";
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
  }
}
