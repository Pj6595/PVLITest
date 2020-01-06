export default class End extends Phaser.Scene{
    constructor(){
        super({key: 'end'});
    }

    create(){
        let text = this.add.text(200, 300, 'FIN DEL JUEGO', {fontSize: 50});
        this.sound2 = this.sound.add('sound2');
        this.sound2.play();
    }
}