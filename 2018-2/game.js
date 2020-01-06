import Player from './player.js'
import Platform from './platform.js'
import Coin from './coin.js'

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  preload() {  
  }

  create() {
    this.physics.world.setBounds(0, 0, 800, 600);
    let background = this.add.image(400, 300, 'background').setScale(2);
    this.player = new Player(this, 100, 550, 100);

    this.createSound();
    this.createPlatforms();
    this.createCoins();
    

    this.pointsText = this.add.text(20, 20, 'Points: ' + this.player.points, {fontSize: 20});
  }

  pointUp(){
    this.player.points++;
    this.pointsText.setText('Points: ' + this.player.points);
  }

  createPlatforms(){
    this.platforms = this.add.group();
    this.platforms.add(new Platform(this, 150, 350));
    this.platforms.add(new Platform(this, 650, 350));
    this.platforms.add(new Platform(this, 400, 200));

    this.physics.add.collider(this.player, this.platforms);
  }

  createCoins(){
    this.coins = this.add.group();
    this.coins.add(new Coin(this, 150, 275));
    this.coins.add(new Coin(this, 650, 275));
    this.coins.add(new Coin(this, 400, 125));

    this.physics.add.overlap(this.player, this.coins, (player, coin) =>{
      coin.destroy();
      this.pointUp();
      this.coinSound.play();
    });
  }

  createSound(){
    this.coinSound = this.sound.add('coinSound');
    this.jumpSound = this.sound.add('jumpSound');
  }

  update(time, delta) {    
  }
}