import Star from './star.js'

export default class Base extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'base');

        this.scene = scene;
        this.scene.add.existing(this);

        this.setPhysics();
    }

    setPhysics(){
        this.scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
        this.body.checkCollision = false;
        this.setScale(0.6);
        this.y -= this.displayHeight/2;
    }

    spawnStar(){
        new Star(this.scene, this.x, this.y - this.displayHeight* 2, this);
    }
}