export default class Boot extends Phaser.Scene{
    constructor(){
        super({key:'boot'});
    }

    preload(){
        this.load.image('background', 'resources/background.jpg');
        this.load.image('wall', 'resources/pared.png');
        this.load.image('wallV', 'resources/paredV.png');
        this.load.image('ball', 'resources/bola.png');
        this.load.image('player', 'resources/player.png');
    }

    create(){
        this.scene.start('main');
    }
}