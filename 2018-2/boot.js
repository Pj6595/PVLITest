export default class Boot extends Phaser.Scene{
    constructor(){
        super({key:'boot'});
    }

    preload(){
        this.load.image('background', 'resources/background.jpg');

        this.load.spritesheet('player', 'resources/player.png', {frameWidth: 70.5, frameHeight: 94});

        this.load.image('platform', 'resources/platform.png');
        this.load.image('coin', 'resources/coin.png');

        this.load.audio('coinSound', 'resources/sound1.mp3');
        this.load.audio('jumpSound', 'resources/sound2.mp3');
    }

    create(){
        this.scene.start('main');
    }
}