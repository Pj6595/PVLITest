export default class Coin extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'coin');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.setScale(0.05);
    }
}