import Box from './box.js'

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  preload() {  
  }

  create() {
    this.matter.world.setBounds(0, 0, 800, 600);
    let background = this.add.image(400, 300, 'background').setScale(2);

    this.boxes = [];
    this.boxSelected = -1;

    this.createAudio();
    this.createKeys();
    
  }

  createKeys(){
    this.addBoxKey = this.input.keyboard.addKey('SPACE');
    this.addBoxKey.on('down', event => {this.addBox();});

    this.deleteBoxKey = this.input.keyboard.addKey('D');
    this.deleteBoxKey.on('down', event => {this.deleteBox();});

    this.thrustUpKey = this.input.keyboard.addKey('I').on('down', event => {
      if(this.boxSelected > -1) this.boxes[this.boxSelected].thrustLeft(0.3);
      this.sound4.play();
    });

    this.thrustDownKey = this.input.keyboard.addKey('K').on('down', event => {
      if(this.boxSelected > -1) this.boxes[this.boxSelected].thrustRight(0.3);
      this.sound4.play();
    });

    this.thrustLeftKey = this.input.keyboard.addKey('J').on('down', event => {
      if(this.boxSelected > -1) this.boxes[this.boxSelected].thrustBack(0.3);
      this.sound4.play();
    });

    this.thrustRightKey = this.input.keyboard.addKey('L').on('down', event => {
      if(this.boxSelected > -1) this.boxes[this.boxSelected].thrust(0.3);
      this.sound4.play();
    });

    this.rotateKey = this.input.keyboard.addKey('S').on('down', event=>{
      if(this.boxSelected > -1){
        this.boxes[this.boxSelected].setRotation(this.boxes[this.boxSelected].rotation + (90 * (Math.PI / 180)));
      }
    });

    //PARA APLICAR FUERZA -> this.applyForce({x:0.x, y:0.x});
  }

  createAudio(){
    this.sound1 = this.sound.add('sound1');
    this.sound2 = this.sound.add('sound2');
    this.sound3 = this.sound.add('sound3');
    this.sound4 = this.sound.add('sound4');
  }

  addBox(){
    let posX = Math.random()*800; let posY = Math.random()*600;
    let velocityX = Math.random()*20; let velocityY = Math.random()*20;

    if(this.boxSelected != -1) this.boxes[this.boxSelected].toggleSelected();

    this.boxes.push(new Box(this, posX, posY, 'box', velocityX, velocityY));
    this.boxSelected = this.boxes.length -1;

    this.sound1.play();
  }

  changeSelectedBox(box){
    let boxPos = this.boxes.indexOf(box);

    this.boxes[this.boxSelected].toggleSelected();
    box.toggleSelected();
    this.boxSelected = boxPos;

    this.sound2.play();
  }

  deleteBox(){
    if(this.boxSelected != -1) this.boxes[this.boxSelected].destroy();
    this.boxes.splice(this.boxSelected, 1);

    if(this.boxes.length > 0) {
      this.boxSelected = Math.trunc(Math.random()*(this.boxes.length));
      this.boxes[this.boxSelected].toggleSelected();
    } else this.boxSelected = -1;

    this.sound3.play();
  }

  update(time, delta) {    

  }
}