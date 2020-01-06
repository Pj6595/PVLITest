export default class Platform extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'platform');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
        this.setScale(0.5);
        this.body.checkCollision.down = false;
        this.body.checkCollision.left = false;
        this.body.checkCollision.right = false;
    }
}