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
let state = "title screen";


function setup() {
  new Canvas(windowWidth, windowHeight);
  world.gravity.y = WORLD_GRAVITY;
}

function draw() {
  if (state === "title screen") {
    background(155);
    titleScreenText();
    titleScreenButtonStart();
  }
  else if (state === "set up") {
    mainCharacter();
    theEnemy1();
    theGunCharacteristics();
    thePlatforms();
    state = "game on";
  }
  else if (state === "game on") {
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
}

function mainCharacter() {
  player = new Sprite(20, height/2, 20);
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
  mainCharacterGun.color = "purple";
  mainCharacterGun.mass = 0;
}

function playerMovement() {
  if (canJump) {
    if (kb.presses("w")) {
      for (let i = 0; i < platforms.length; i++) {
        if (player.colliding(platforms[i])) {
          player.vel.y = -4;
          canJump = false;
          break;
        }
      }
    }
  }
  for (let i = 0; i < platforms.length; i++) {
    if (player.collides(platforms[i])) {
      canJump = true;
    }
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
  if (player.y > height) {
    player.x = 20; 
    player.y = height/2; 
    player.vel.y = 0;
  }
}

function thePlatforms() {
let platform1 = new Sprite(20, height/2 + 50, 100, 20, "static");
platform1.color = "red";
platforms.push(platform1);

let platform2 = new Sprite(300, height/2, 200, 20, "static");
platform2.color = "red";
platforms.push(platform2);

let platform3 = new Sprite(500, height/2 + 50, 150, 20, "static");
platform3.color = "red";
platforms.push(platform3);

let platform4 = new Sprite(900, height/2 + 100, 100, 20, "static");
platform4.color = "red";
platforms.push(platform4);

let platform5 = new Sprite(1000, height/2, 20, 100, "static");
platform5.color = "red";
platforms.push(platform5);

let platform6 = new Sprite(1100, height/2, 100, 20, "static");
platform6.color = "red";
platforms.push(platform6);
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
    }
  }
}

function drawHealthBar() {
  fill(255, 0, 0);
  rect(20, 40, 100, 10);
  fill(0, 255, 0);
  rect(20, 40, playerHealth, 10);
}

function gameOver() {
  if (playerHealth <= 0) {
    noLoop();
  }
} 

function titleScreenText() {
  textAlign(CENTER);
  textFont("Trebuchet MS");
  fill("black");
  textSize(40);
  text("The Game", width / 2, height / 2);
}

function titleScreenButtonStart() {
  let startButton = new Clickable();
  startButton.text = "Start the Action!";
  textAlign(CENTER);
  startButton.textSize = 25;
  startButton.textColor = color(0);
  startButton.width = 200;
  startButton.height = 45;
  startButton.cornerRadius = 10;
  startButton.x = width/2 - startButton.width/2;
  startButton.y = height/2 + 50;
  startButton.onHover = function () {
    startButton.color = "red";
  }
  startButton.onPress = function() {
    state = "set up";
  };
  startButton.draw();
}
