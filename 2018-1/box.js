export default class Box extends Phaser.Physics.Matter.Sprite{
    constructor(scene, x, y, texture, velocityX, velocityY){
        super(scene.matter.world, x, y, texture);
        this.world = scene.matter.world;

        this.setInteractive();
        this.on('pointerdown', ()=>{this.scene.changeSelectedBox(this);});

        this.selected = true;

        this.setScale(0.5);
        this.setVelocity(velocityX, velocityY);
        this.scene.add.existing(this);

        this.setBody('square');
    }

    toggleSelected(){
        console.log("TOGGLE");
        this.selected = !this.selected;
        if(this.frame.name === 1) this.setFrame(0); else this.setFrame(1);
        console.log(this.frame);
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        //if(this.forceKey.isDown) console.log('a');
    }
}