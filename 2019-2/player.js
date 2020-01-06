export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, speed){
        super(scene, x, y, 'player');

        this.speed = speed;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
        this.body.setGravityY(1);

        this.horizontalMovement = 0;

        this.points = 0;

        this.createKeys();
        this.createAnimations();
    }

    createAnimations(){
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('player', {start:0, end:4}),
            frameRate: 10,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('player', {start:0, end:0}),
            frameRate: 1,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNumbers('player', {start:12, end:14}),
            frameRate: 5,
            repeat: -1
        })

        this.anims.play('idle');
    }

    createKeys(){
        this.left = this.scene.input.keyboard.addKey('LEFT');
        this.right = this.scene.input.keyboard.addKey('RIGHT');
        this.up = this.scene.input.keyboard.addKey('UP');
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);

        if(this.left.isDown) {
            this.horizontalMovement = -1;
            this.setFlipX(true);
            if (this.anims.currentAnim.key != 'walk' && this.anims.currentAnim.key != 'jump') this.anims.play('walk');
        }
        else if(this.right.isDown){
            this.horizontalMovement = 1;
            this.setFlipX(false);
            if (this.anims.currentAnim.key != 'walk' && this.anims.currentAnim.key != 'jump') this.anims.play('walk');
        } 
        else{
            this.horizontalMovement = 0;
            if(this.body.onFloor() || this.body.touching.down) this.anims.play('idle');
        } 

        if(this.up.isDown && (this.body.onFloor() || this.body.touching.down)) {
            this.body.setVelocityY(-450);
            this.anims.play('jump');
        }

        this.body.setVelocityX(this.speed * this.horizontalMovement);
    }
}