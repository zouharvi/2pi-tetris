Boot = function() {}
Boot.prototype = {
 preload: function() {
  game.load.image('black', 'assets/black.png');
  game.load.image('logo', 'assets/logo.png');
  game.load.bitmapFont('apple2','assets/fonts/apple2.png', 'assets/fonts/apple.fnt');
 },
 create: function() {
  transitionTo('preload');
 }
}

Preload = function() { }
Preload.prototype = {
 preload: function() {
  createSprite(100, 230, 'logo', 3, 3);
  createText(380, 20, 'loading', 'apple2', 2);
  createText(195, 574, 'an experimental game by @ViliX64', 'apple2', 2);
  transitionOut();

  // assets
  game.load.spritesheet('block', 'assets/blocks.png', 8, 8);
  game.load.audio('hit', 'assets/hit.ogg');
  game.load.audio('theme', 'assets/theme.ogg');


  // scripts 
  game.load.script('gj-js-api-min.js', 'gj-js-api-min.js');
  game.load.script('menu/menu.js', 'menu/menu.js');
  game.load.script('game/game.js', 'game/game.js');
  game.load.script('game/controls.js', 'game/controls.js');
  game.load.script('game/block.js', 'game/block.js');
  game.load.script('game/block_disp.js', 'game/block_disp.js');
  game.load.script('game/grid.js', 'game/grid.js');
  game.load.script('game/game_counter.js', 'game/game_counter.js');
  game.load.script('etc/matrix_transformation.js', 'etc/matrix_transformation.js');
 },

 create: function() {
  initStates();
  game.time.events.add(Phaser.Timer.SECOND * 1, function() {
   transitionTo('menu');
  }, this);
 }
}
