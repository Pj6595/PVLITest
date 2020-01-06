export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, speed){
        super(scene, x, y, 'player');
        
        this.speed = speed;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();

        this.body.setGravityY(1);

        this.movement = {vertical: 0, horizontal:0};

        this.points = 0;

        this.setAnimations();
        this.setKeys();
    }

    setKeys(){
        this.left = this.scene.input.keyboard.addKey('LEFT');
        this.right = this.scene.input.keyboard.addKey('RIGHT');
        this.jump = this.scene.input.keyboard.addKey('SPACE');
    }

    setAnimations(){
        this.scene.anims.create({
            key: 'goingRight',
            frames: this.scene.anims.generateFrameNumbers('player', {start:2, end:9}),
            frameRate: 3,
            repeat: -1
        })
        this.scene.anims.create({
            key: 'goingLeft',
            frames: this.scene.anims.generateFrameNumbers('player', {start:12, end:14}),
            frameRate: 3,
            repeat: -1
        })
        this.scene.anims.create({
            key: 'idle',
			frames: [ { key: 'player', frame: 0 } ],
			frameRate: 1,
			repeat: -1
        })
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);

        if(this.left.isDown){
            if(this.anims.currentAnim.key == 'idle' || this.anims.currentAnim.key === 'goingRight')
                this.anims.play('goingLeft');
            this.movement.horizontal = -1;
        }
        else if(this.right.isDown){
            if(this.anims.currentAnim.key === 'idle' || this.anims.currentAnim.key === 'goingLeft')
                this.anims.play('goingRight');
            this.movement.horizontal = 1;
        }
        else{
            this.anims.play('idle');
            this.movement.horizontal = 0;
        } 

        this.body.setVelocityX(this.speed * this.movement.horizontal);

        if(this.jump.isDown && (this.body.onFloor() || this.body.touching.down)){
            this.body.setVelocityY(-500);
            this.scene.jumpSound.play();
        }
    }
}