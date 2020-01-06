import Platform from './platform.js'
import Player from './player.js'

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  create() {
    let background = this.add.image(400, 300, 'background').setScale(2);

    this.physics.world.setBounds(0,0,800,600);

    this.player = new Player(this, 100, 500, 200);

    this.pointsText = this.add.text( 20, 20, 'Points: ' + this.player.points, {fontSize: 30});

    this.createPlatformsAndBases();
    this.createSound();
  }

  createSound(){
    this.sound1 = this.sound.add('sound1');
  }

  createPlatformsAndBases(){
    this.bases = this.add.group();
    this.platforms = this.add.group();

    this.platforms.add(new Platform(this, 150, 400, this.bases));
    this.platforms.add(new Platform(this, 400, 275, this.bases));
    this.platforms.add(new Platform(this, 650, 400, this.bases));
    this.platforms.add(new Platform(this, 150, 150, this.bases));
    this.platforms.add(new Platform(this, 650, 150, this.bases));   
    
    this.physics.add.collider(this.platforms, this.player);

    this.spawnStar();
  }

  updatePointsText(){
    this.pointsText.setText('Points: ' + this.player.points);
  }

  spawnStar(from = null){
    if(this.player.points < 10){
      Phaser.Math.RND.pick(from || this.bases.children.entries).spawnStar();
      this.updatePointsText();
      if(this.player.points > 0) this.sound1.play();
    }
    else this.scene.start('end');
  }

  update(time, delta) {    

  }
}