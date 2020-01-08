export default class Ball extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, radius, direction, speed, level){
        super(scene, x, y, 'ball');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(1/level);
        this.body.setCircle(this.radius);
        
        
        
        this.direction = direction;
        this.speed = speed;
        this.level = level;
        this.radius = radius;

        
        this.body.setVelocity(this.direction.x * speed, this.direction.y * speed);
        this.body.setBounce(1);
        this.body.setCollideWorldBounds();
    }
    
    divide(){
        this.scene.addNewBalls(this.level, this.direction, this.speed);
        this.scene.balls.remove(this, true, true);
    }
}