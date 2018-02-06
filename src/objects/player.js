import 'phaser-ce';
export default class Player extends Phaser.Sprite {

  constructor(game) {
    super(game, game.world.centerX, game.world.centerY, 'rect');

    //this.animations.add('idling', ['b17-1', 'b17-2', 'b17-3', 'b17-4'], 20, true);
    //this.animations.play('idling');

    this.width = 60;
    this.scale.y = this.scale.x; // set height by changing Y scale to preserve image's aspect ratio
    this.anchor.setTo(0.5, 0.5);

    // Physics
    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.set(0.4); //bounces when it hits the bottom
    this.body.drag.setTo(70, 70); //bounce eventually fades away
    this.body.gravity.y = 1000; 

  }
  update() {
    // TODO: Stub.
    this.move();
    this.createCircle();
  }

  move() {
    let playerSpd = 1000;
    let minDistToGoal = this.width / 5;

    if (!this.goal_point) { //define if undefined
      this.goal_point = new Phaser.Point(0, 0);
    }
    const distToPointer = Phaser.Point.distance(this, this.goal_point);

    //detect mouse/tap clicks, and update player's desired destination
    if (this.game.input.activePointer.isDown) {
      this.goal_point.x = this.game.input.activePointer.x;
      this.goal_point.y = this.game.input.activePointer.y;

      this.goTowardsLastActivePointer = true;
    }

    //move player towards his desired destination and turn it off when he reaches it
    if (this.goTowardsLastActivePointer) {
      const radians = Phaser.Math.angleBetweenPoints(this, this.goal_point);
      const angle = Phaser.Math.radToDeg(radians);
      this.angle = angle;
      this.scale.y = (Math.abs(angle) > 90) ? -Math.abs(this.scale.y) : Math.abs(this.scale.y);

      if (distToPointer < minDistToGoal) {
        this.goTowardsLastActivePointer = false; //don't move towards last click's position anymore, you've reached it!
      }

      const slowDownDist = this.width / 2;
      playerSpd = Phaser.Math.linear(0, playerSpd, Math.min(slowDownDist, distToPointer) / slowDownDist);
      this.game.physics.arcade.velocityFromAngle(angle, playerSpd, this.body.velocity);

      
      

    }
    // //NOT MOVING
    // else {

      

    //   this.stabilizeRotation();
    // }
  }

  stabilizeRotation() {
    const absRot = Math.abs(this.body.rotation);
    const rotationDir = (absRot > 90) ? 1 : -1;
    const rotationDelta = (absRot < 180 && absRot > 0) ? rotationDir * Phaser.Math.sign(this.body.rotation) : 0;
    this.body.rotation += rotationDelta;
  }

  createCircle() {
    var graphics = this.game.add.graphics(this.worldPosition.x, this.worldPosition.y);
    graphics.beginFill('0x' + ("000000" + Math.random().toString(16).slice(2, 8)).slice(-6));
    graphics.drawCircle(0, 0, Math.random()*100);
    graphics.endFill();
    setTimeout(() => {graphics.destroy();},1000);
  }
}
