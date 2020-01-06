export default class Star extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, base){
        super(scene, x, y, 'coin');

        this.base = base;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.setScale(0.05);

        this.scene.physics.add.overlap(this.scene.player, this, ()=>{ 
            this.scene.player.points++;
            this.pickedUp(); 
        });
    }

    pickedUp(){
        let s = this.scene.bases.children.entries;
        this.scene.spawnStar(s.filter(o => o!==this.base));
        this.destroy();
    }
}