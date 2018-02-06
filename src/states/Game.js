/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */
import 'phaser-ce';
import Logo from '../objects/Logo';
import Player from '../objects/Player';

export default class Game extends Phaser.State {

  create() {
    //  TODO: Replace this content with really cool game code here :)
    const {centerX: x, centerY: y} = this.world;
    //this.add.existing(new Logo(this.game, x, y));
    this.add.existing(new Player(this.game));
  }

}
