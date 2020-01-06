export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, up, left, right, speed, life){
        super(scene, x, y, texture);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setCollideWorldBounds();

        this.speed = speed;
        this.movement = {horizontal:0, vertical:1};
        
        this.up = this.scene.input.keyboard.addKey(up);
        this.left = this.scene.input.keyboard.addKey(left);
        this.right = this.scene.input.keyboard.addKey(right);

        this.body.setGravityY(0);

        this.jump = false;
        this.controllable = true;

        this.collisionForce = 200;
        this.knockBackTime = 200;

        this.life = life;
    }

    checkKnockbackCollision(){
        if(this.body.touching.right) {this.body.setVelocityX(-this.collisionForce); this.movement.horizontal = 0; this.controllable = false;}
        else if(this.body.touching.left) {this.body.setVelocityX(this.collisionForce); this.movement.horizontal = 0; this.controllable = false;}
        else if(this.body.touching.up) {this.body.setVelocityY(this.collisionForce); this.movement.vertical = 0;}
        else if(this.body.touching.down) {this.body.setVelocityY(-this.collisionForce); this.movement.vertical = 0;}
        
        this.scene.time.delayedCall(this.knockBackTime, ()=>{
            this.controllable = true; 
            if(this.life > 0) this.body.setVelocity(0)
        });
    }

    playerCollision(){
        this.life--;
        this.checkKnockbackCollision();
        if(this.life <= 0) this.destroy();
    }

    movementCheck(){
        if(this.left.isDown && this.controllable) this.movement.horizontal = -1;
        else if(this.movement.horizontal == -1 && this.controllable) this.movement.horizontal = 0;
        else if(this.right.isDown && this.controllable) this.movement.horizontal = 1;
        else if(this.movement.horizontal == 1 && this.controllable) this.movement.horizontal = 0;

        if(this.up.isDown && this.jump){ this.body.setVelocityY(-400); this.jump = false;}
    }

    preUpdate(time, delta){
        this.movementCheck();        

        super.preUpdate(time, delta);
        if(this.controllable){
            this.body.setVelocityX(this.speed * this.movement.horizontal);
        }
        if(this.body.onFloor()) this.jump = true;
        
    }
}