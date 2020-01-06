import Player from '/player.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  preload() {  
    this.load.image('player', 'resources/tinky.png');
    this.load.image('background', 'resources/background.jpg');
  }

  create() {
    this.physics.world.setBounds(0, 0, 800, 600);

    let background = this.add.sprite(400,300, 'background');
    background.setScale(2);

    this.player1 = new Player(this, 100, 100, 'player', 'W', 'A', 'D', 200, 10);
    this.player2 = new Player(this, 400, 100, 'player', 'I', 'J', 'L', 200, 5);

    this.physics.add.collider(this.player1, this.player2, (o1, o2) => {o1.playerCollision(); o2.playerCollision(); this.updateUI();});

    this.createLifeUI();
  }

  createLifeUI(){
    this.player1Life = this.add.text(30, 10, 'Vida Jugador 1: ' + this.player1.life, {fontSize: 20});
    this.player2Life = this.add.text(550, 10, 'Vida Jugador 2: ' + this.player2.life, {fontSize: 20});
  }

  updateUI(){
    this.player1Life.setText('Vida Jugador 1: ' + this.player1.life);
    this.player2Life.setText('Vida Jugador 2: ' + this.player2.life);
  }

  update(time, delta) {   
  }
}