export default class Wall extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, vertical = false){
        if(vertical) super(scene, x, y, 'wallV');
        else super(scene, x, y, 'wall');

        

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        if(vertical) this.body.angle = 20;
    }
}