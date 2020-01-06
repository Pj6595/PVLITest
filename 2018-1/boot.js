export default class Boot extends Phaser.Scene{
    constructor(){
        super({ key: 'Boot' });
    }
    preload(){
        this.load.image('background', 'resources/background.jpg');

        this.load.spritesheet('box','resources/tinky.png',{frameWidth: 167, frameHeight: 238});

        this.load.audio('sound1', 'resources/sound1.mp3');
        this.load.audio('sound2', 'resources/sound2.mp3');
        this.load.audio('sound3', 'resources/sound3.mp3');
        this.load.audio('sound4', 'resources/sound4.mp3');
    }
    create(){
        this.scene.start('main');
    }
}