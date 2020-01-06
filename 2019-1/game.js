import Wall from './wall.js'

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
  }

  create() {
    let background = this.add.image(400, 300, 'background').setScale(2);
    this.walls = this.add.group();
    this.walls.add(new Wall(this, 400, 60));
    this.walls.add(new Wall(this, 700, 300, true));
    this.walls.add(new Wall(this, 100, 300, true));
    this.walls.add(new Wall(this, 400, 540));
  }

  update(time, delta) {    
  }
}