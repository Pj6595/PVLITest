import Base from './base.js'

export default class Platform extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, baseGroup){
        super(scene, x, y, 'platform');

        this.baseGroup = baseGroup;
        this.scene = scene;

        this.scene.add.existing(this);
        this.setPhysics();
        this.createBase();
        
    }

    setPhysics(){
        this.scene.physics.add.existing(this);
        this.body.setImmovable(true);

        this.body.setAllowGravity(false);
        this.body.checkCollision.down = false;
        this.body.checkCollision.left = false;
        this.body.checkCollision.right = false;

        this.setScale(0.4);
    }

    createBase(){
        this.baseGroup.add(new Base(this.scene, this.x, this.y - (this.displayHeight/2)));
    }
}