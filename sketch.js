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
let checkpoints = [];
let dist1;
let playerHealth = 100;
let playerSpawnPoint;
let state = "title screen";
let titleMusic;

function preload() {
  titleMusic = loadSound('assets/Music/Juhani Junkala [Retro Game Music Pack] Title Screen.wav');
}

function setup() {
  new Canvas(windowWidth, windowHeight);
  world.gravity.y = WORLD_GRAVITY;
}

function draw() {
  if (state === "title screen") {
    background(155);
    titleScreenText();
    titleScreenButtonStart();
    titleScreenButtonHowToPlay();
    titleMusic.loop();
  }
  else if (state === "how to play") {
    drawHowToPlay();
  }
  else if (state === "set up") {
    mainCharacter();
    theEnemy1();
    theGunCharacteristics();
    thePlatforms();
    theCheckpoints();
    state = "game on";
  }
  else if (state === "game on") {
    background("#87CEEB");
    theCamera();
    drawCheckpoints();
    playerMovement();
    theGunBehaviour();
    shootyShoot();
    updateBullet();
    theEnemy1Behaviour();
    platform17Behaviour();
    drawHealthBar();
    gameOver();
  }
  else if (state === "game over") {
    background(155);
    drawGameOverScreen();
  }
}

function mainCharacter() {
  player = new Sprite(20, height/2, 20);
  player.color = "green";
  playerSpawnPoint = createVector(20, height/2);
}

function theEnemy1() {
  let x
  let y;
  let distance;

  x = random(1100, width);
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
    playerHealth -= 50;
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
  // if (canJump) {
  //   if (kb.presses("w") || kb.presses(" ")) {
  //     for (let i = 0; i < platforms.length; i++) {
  //       if (player.colliding(platforms[i])) {
  //         player.vel.y = -4;
  //         canJump = false;
  //         break;
  //       }
  //     }
  //   }
  // }
  if (kb.presses("w")) {
    player.vel.y = -4;
  }
  for (let i = 0; i < platforms.length; i++) {
    if (player.collides(platforms[i])) {
      canJump = true;
      if (i === 16) { 
        platforms[i].vel.y = -2; 
      }
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
    player.x = playerSpawnPoint.x;
    player.y = playerSpawnPoint.y;
    player.vel.y = 0;
  }
}

function thePlatforms() {
  //first checkpoint
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

  let platform6 = new Sprite(1100, height/2, 120, 20, "static");
  platform6.color = "red";
  platforms.push(platform6);

  //second checkpoint
  let platform7 = new Sprite(1180, height/2, 40, 20, "static");
  platform7.color = "red";
  platforms.push(platform7);

  let platform8 = new Sprite(1450, height/2 - 100, 20, 200, "static");
  platform8.color = "red";
  platforms.push(platform8);

  let platform9 = new Sprite(1650, height/2 - 300, 20, 200, "static");
  platform9.color = "red";
  platforms.push(platform9);

  let platform10 = new Sprite(1850, height/2 - 100, 20, 200, "static");
  platform10.color = "red";
  platforms.push(platform10);

  let platform11 = new Sprite(2050, height/2 - 300, 20, 200, "static");
  platform11.color = "red";
  platforms.push(platform11);

  let platform12 = new Sprite(2450, height/2, 300, 10, "static");
  platform12.color = "red";
  platforms.push(platform12);

  //third checkpoint
  let platform13 = new Sprite(2850, height/2, 200, 15, "k");
  platform13.color = "blue";
  platform13.rotationSpeed = 1;
  platforms.push(platform13);

  let platform14 = new Sprite(3250, height/2, 200, 15, "k");
  platform14.color = "blue";
  platform14.rotationSpeed = 3;
  platforms.push(platform14);

  let platform15 = new Sprite(3650, height/2, 100, 15, "k");
  platform15.color = "blue";
  platform15.rotationSpeed = 5;
  platforms.push(platform15);

  let platform16 = new Sprite(4000, height/2, 250, 15, "k");
  platform16.color = "blue";
  platform16.rotationSpeed = 3;
  platform16.offset.x = 125;
  platforms.push(platform16);

  let platform17 = new Sprite(4400, height/2, 200, 15, "k");
  platform17.color = "pink";
  platforms.push(platform17); 

  let platform18 = new Sprite(4600, height/2 - 500, 100, 20, "static");
  platform18.color = "red";
  platforms.push(platform18); 

  //fourth checkpoint
  let platform19 = new Sprite(4800, height/2 - 530, 20, 20, "static");
  platform19.color = "red";
  platforms.push(platform19);

  let platform21 = new Sprite(5000, height/2 - 420, 20, 20, "static");
  platform21.color = "red";
  platforms.push(platform21);

  let platform22 = new Sprite(5170, height/2 - 490, 20, 20, "static");
  platform22.color = "red";
  platforms.push(platform22);

  let platform23 = new Sprite(5390, height/2 - 400, 20, 20, "static");
  platform23.color = "red";
  platforms.push(platform23);

  let platform24 = new Sprite(5530, height/2 - 450, 20, 20, "static");
  platform24.color = "red";
  platforms.push(platform24);

  let platform25 = new Sprite(5690, height/2 - 350, 20, 20, "static");
  platform25.color = "red";
  platforms.push(platform25);

  let platform26 = new Sprite(6100, height/2 - 250, 200, 20, "static");
  platform26.color = "red";
  platforms.push(platform26);

  //fifth checkpoint
  let platform272 = new Sprite(6650, height/2 - 250, 20, 20, "k");
  platform272.color = "red";
  platforms.push(platform272);
  
  let platform27 = new Sprite(6450, height/2 - 250, 400, 10);
  platform27.color = "red";
  platforms.push(platform27);

}

function theCheckpoints() {
  let checkpoint1 = new Checkpoint(1150, height/2, 20, 20, "static");
  checkpoints.push(checkpoint1);

  let checkpoint2 = new Checkpoint(2550, height/2, 20, 10, "static");
  checkpoints.push(checkpoint2);

  let checkpoint3 = new Checkpoint(4600, height/2 - 500, 20, 20, "static")
  checkpoints.push(checkpoint3);

  let checkpoint4 = new Checkpoint(6150, height/2 - 250, 20, 20, "static")
  checkpoints.push(checkpoint4);
}

function theCamera() {
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
    state = "game over";
  }
}

function titleScreenText() {
  textAlign(CENTER);
  textFont("Trebuchet MS");
  fill("black");
  textSize(40);
  text("CIRCLE ADVENTURES", width / 2, height / 2);
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
  startButton.onPress = function() {
    state = "set up";
  };
  startButton.draw();
}

function titleScreenButtonHowToPlay() {
  let howToPlayButton = new Clickable();
  howToPlayButton.text = "How to Play";
  textAlign(CENTER);
  howToPlayButton.textSize = 25;
  howToPlayButton.textColor = color(0);
  howToPlayButton.width = 200;
  howToPlayButton.height = 45;
  howToPlayButton.cornerRadius = 10;
  howToPlayButton.x = width/2 - howToPlayButton.width/2;
  howToPlayButton.y = height/2 + 120;
  howToPlayButton.onPress = function() {
    state = "how to play";
  };
  howToPlayButton.draw();
}

function drawHowToPlay() {
  background(155);
  fill(0);
  textSize(32);
  text("How to Play", width/2, 50);
  
  fill(0);
  textSize(20);
  textAlign(CENTER);
  text("Hold down 'A' and 'D' to move left and right. Press 'W' or 'SPACE' to Jump. Press your left mouse button to shoot.", width/2, 100);
  text("In order to wall run, spam the jump button while running against the wall.", width/2, 160);

  fill("yellow");
  rect(width/2 - 50, 350, 20, 20);
  fill("green");
  rect(width/2 + 50, 350, 20, 20);
  
  fill("black");
  textAlign(CENTER);
  text("This yellow square is a check point. If you touch it, it will turn green, which means that will be your new spawn point if you fall.", width/2, 220);
  text(" If an enemy kills you, you will have to restart the level.", width/2, 270)
  
  let backButton = new Clickable();
  backButton.text = "Back to Main Menu";
  backButton.textSize = 25;
  backButton.textColor = color(0);
  backButton.width = 300;
  backButton.height = 45;
  backButton.cornerRadius = 10;
  backButton.x = width/2 - backButton.width/2;
  backButton.y = height/2 + 200;
  backButton.onPress = function() {
    state = "title screen";
  };
  backButton.draw();
}

function drawCheckpoints() {
  for (let i = 0; i < checkpoints.length; i++) {
    checkpoints[i].checkCollision();
  }
}

function Checkpoint(x, y, width, height, state) {
  this.sprite = new Sprite(x, y, width, height, state);
  this.sprite.color = "yellow";
  this.touched = false;

  this.draw = function() {
    fill(this.sprite.color);
    rect(this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height);
  }

  this.checkCollision = function() {
    if (player.collides(this.sprite) && this.touched === false) {
      this.sprite.color = "green";
      this.touched = true;
      playerSpawnPoint = createVector(this.sprite.x, this.sprite.y - 50);
      playerHealth = 100;
    }
  }
}

function drawGameOverScreen() {
  player.visible = false;
  enemy1.visible = false;
  mainCharacterGun.visible = false;
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].visible = false;
  }
  for (let i = 0; i < checkpoints.length; i++) {
    checkpoints[i].sprite.visible = false;
  }

  textAlign(CENTER);
  text("Game Over", width/2, height/2);

  let tryAgainButton = new Clickable();
  tryAgainButton.text = "Try Again?";
  tryAgainButton.textSize = 25;
  tryAgainButton.textColor = color(0);
  tryAgainButton.width = 200;
  tryAgainButton.height = 45;
  tryAgainButton.cornerRadius = 10;
  tryAgainButton.x = width/2 - tryAgainButton.width/2;
  tryAgainButton.y = height/2 + 50;
  tryAgainButton.onPress = function() {
    state = "set up";
    playerHealth = 100;
    player.x = playerSpawnPoint.x;
    player.y = playerSpawnPoint.y;
    for (let i = 0; i < checkpoints.length; i++) {
      checkpoints[i].sprite.visible = true;
      checkpoints[i].sprite.color = "yellow";
      checkpoints[i].touched = false;
    }
  };
  tryAgainButton.draw();

  let mainMenuButton = new Clickable();
  mainMenuButton.text = "Main Menu Because I Am A Weakling";
  mainMenuButton.textSize = 25;
  mainMenuButton.textColor = color(0);
  mainMenuButton.width = 500;
  mainMenuButton.height = 45;
  mainMenuButton.cornerRadius = 10;
  mainMenuButton.x = width/2 - mainMenuButton.width/2;
  mainMenuButton.y = height/2 + 100;
  mainMenuButton.onPress = function() {
    state = "title screen";
  };
  mainMenuButton.draw();
}

function platform17Behaviour() {
  for (let i = 0; i < platforms.length; i++) {
    if (i === 16) { // platform 17
      if (platforms[i].y < height/2 - 500) {
        platforms[i].vel.y = 0; 
      }
    }
  }
}
