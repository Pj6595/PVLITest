export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, speed){
        super(scene, x, y, 'player');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(0.6);

        this.movement = {x:0, y:0};
        this.speed = speed;

        this.createCursorKeys();
    }
    createCursorKeys(){
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }
    preUpdate(time, delta){
        super.preUpdate(time, delta);

        if(this.cursors.down.isDown) this.movement.y = 1; 
        else if(this.cursors.up.isDown) this.movement.y = -1; 
        else this.movement.y = 0;

        if(this.cursors.left.isDown) this.movement.x = -1;
        else if (this.cursors.right.isDown) this.movement.x = 1;
        else this.movement.x = 0;

        this.body.setVelocity(this.speed * this.movement.x, this.speed * this.movement.y);
    }
}