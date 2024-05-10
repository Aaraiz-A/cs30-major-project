let floor, ball;

function setup() {
  new Canvas(500, 200);
  world.gravity.y = 10;

  //                ([vertex0, vertex1, vertex2, ...])
  floor = new Sprite([[20, 60], [200, 140], [450, 180]]);
  floor.collider = "static";

  ball = new Sprite(40, 0, 20);
}