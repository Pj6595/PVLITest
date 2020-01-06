export default class Boot extends Phaser.Scene{
    constructor(){
        super({key:'boot'});
    }

    preload(){
        this.load.image('background', 'resources/background.jpg');
        this.load.image('wall', 'resources/pared.png');
        this.load.image('wallV', 'resources/paredV.png');
    }

    create(){
        this.scene.start('main');
    }
}