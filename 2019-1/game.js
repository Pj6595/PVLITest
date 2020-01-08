import Wall from './wall.js'
import Ball from './ball.js'
import Player from './player.js'

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
  }

  create() {
    let background = this.add.image(400, 300, 'background').setScale(2);

    this.physics.world.setBounds(0,0,800,600);

    this.player = new Player(this, 200, 400, 200);

    this.createBallsAndWalls();

    this.restartKey = this.input.keyboard.addKey('SPACE');

    this.createTimerAndUI();     
  }

  createBallsAndWalls(){
    this.walls = this.add.group();
        this.walls.add(new Wall(this, 400, 60));
        this.walls.add(new Wall(this, 700, 300, true));
        this.walls.add(new Wall(this, 100, 300, true));
        this.walls.add(new Wall(this, 400, 540));

        this.balls = this.add.group();
        this.balls.add(new Ball(this, 200, 200, 60, {x:1, y:1}, 80, 1));

        this.physics.add.collider(this.walls, this.balls);
      this.physics.add.collider(this.walls, this.player);
      this.physics.add.overlap(this.player, this.balls, (player, ball)=>{
      ball.divide();
    })
  }

  createTimerAndUI(){
    this.collisionsLeft = 7;
    this.timeLeft = 60;

    this.infoText = this.add.text(150, 100, 'Quedan ' + this.timeLeft + ' segundos y ' + this.collisionsLeft + ' colisiones', {fontSize: 20});

    this.timer = this.time.addEvent({
      delay: 1000,
      callback: updateThings => {
        this.timeLeft--;
        this.updateUI();
      },
      args: [this.infoText],
      callBackscope: this,
      loop: true
    })       
  }

  addNewBalls(level, direction, speed, radius){
    this.collisionsLeft--;
    this.updateUI();
    if(level < 3){
      this.balls.add(new Ball(this, this.player.x, (this.player.y - this.player.height*2), radius/2, {x: direction.x, y:-Math.abs(direction.y)}, speed, level+1));
      this.balls.add(new Ball(this, this.player.x, (this.player.y + this.player.height), radius/2, {x: direction.x, y:Math.abs(direction.y)}, speed, level+1));
      console.log(this.player.x);
    }
  }

  update(time, delta) {  
    if(this.balls.getLength() == 0) {
      this.timer.paused = true;
      this.infoText.setText('Has ganado. Pulsa espacio para reiniciar', {fontSize: 30});
      if(this.restartKey.isDown) this.scene.restart('main');
    } else if(this.timeLeft <= 0){
      this.timer.paused = true;
      this.physics.pause();
      this.infoText.setText('Has perdido. Pulsa espacio para reiniciar', {fontSize: 30});
      if(this.restartKey.isDown) this.scene.restart('main');
    }
    //console.log(this.timer.getElapsedSeconds());
  }

  updateUI(){
    this.infoText.setText('Quedan ' + this.timeLeft + ' segundos y ' + this.collisionsLeft + ' colisiones');  
  }
}