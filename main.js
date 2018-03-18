var game = new Phaser.Game(900, 600, Phaser.AUTO, "");


game.state.add('preload', Preload);
game.state.add('boot', Boot);

game.state.start('boot');

var guest;

function initStates() {
 game.state.add('game', Game);
 game.state.add('menu', Menu);

 guest = "Guest " + Math.floor(Math.random() * 1000000);
 var music = game.add.audio('theme');
 music.volume = 0.3;
 music.loopFull();
}
