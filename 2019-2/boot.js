export default class Boot extends Phaser.Scene{
    constructor(){
        super({key:'boot'});
    }

    preload(){
        this.load.image('coin', 'resources/coin.png');
        this.load.spritesheet('player', 'resources/player.png', {frameWidth: 70.5, frameHeight: 94});
        this.load.image('platform', 'resources/platform.png');
        this.load.image('background', 'resources/background.jpg');
        this.load.image('base', 'resources/base.png');
        this.load.audio('sound1', 'resources/sound1.mp3');
        this.load.audio('sound2', 'resources/sound2.mp3');
    }

    create(){
        this.scene.start('main');
    }
}