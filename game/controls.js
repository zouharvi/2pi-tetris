Controls = function() {
 game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(this.tryMoveLeft, this);
 game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(this.tryMoveRight, this);
 game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.tryMorph, this);
 game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(this.tryRotate, this);

 game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.tryToMenu, this);

 if(p2mode) {
  game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(this.tryMoveRight2, this);
  game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(this.tryMoveLeft2, this);
  game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(this.tryMorph2, this);
  game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(this.tryRotate2, this);
 }
}

Controls.prototype.tryMoveLeft = function() {
 if(blockDisp != null && !lost)
  blockDisp.moveLeft();
}

Controls.prototype.tryMoveRight = function() {
 if(blockDisp != null && !lost)
  blockDisp.moveRight();
}

Controls.prototype.tryMorph = function() {
 if(allowMorphing && blockDisp != null && !lost) {
  blockDisp.morph();
  blockDisp = null;
  game.time.events.add(800, function() {
   blockDisp = new BlockDisp(true);
  }, this);
 }
}

Controls.prototype.tryRotate = function() {
 if(blockDisp != null && !lost)
  blockDisp.transposeInvert();
}

// player 2
Controls.prototype.tryMoveLeft2 = function() {
 if(blockDisp2 != null && !lost)
  blockDisp2.moveLeft();
}

Controls.prototype.tryMoveRight2 = function() {
 if(blockDisp2 != null && !lost)
  blockDisp2.moveRight();
}

Controls.prototype.tryMorph2 = function() {
 if(allowMorphing && blockDisp2 != null && !lost) {
  blockDisp2.morph();
  blockDisp2 = null;
  game.time.events.add(600, function() {
   blockDisp2 = new BlockDisp(false);
  }, this);
 }
}

Controls.prototype.tryRotate2 = function() {
 if(blockDisp2 != null && !lost)
  blockDisp2.transposeInvert();
}


Controls.prototype.tryToMenu = function() {
 transitionTo('menu');
}
