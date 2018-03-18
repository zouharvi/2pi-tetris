Menu = function() {}

Menu.prototype.create = function() {
 this.stage.backgroundColor = 0x000000;

 createText(450, 200, '1 player', 'apple2', 2).anchor.setTo(0.5, 0);
 createText(450, 300, '2 players', 'apple2', 2).anchor.setTo(0.5, 0);
 this.instructionsText = createText(450, 400, 'instructions', 'apple2', 2);
 this.instructionsText.anchor.setTo(0.5, 0);

 this.block = createSprite(350, 200, 'block', 1, 1);
 this.block.frame = 1;

 this.current = 0;
 this.max = 2;
 
 game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(this.tryGoDown, this);
 game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(this.tryGoDown, this);
 game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.tryGoUp, this);
 game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(this.tryGoUp, this);
 
 game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.enter, this);
 game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.enter, this);

 transitionOut();
}

Menu.prototype.tryGoUp = function() {
 this.current--;
 if(this.current < 0)
  this.current = this.max;
 this.refresh();
}

Menu.prototype.tryGoDown = function() {
 this.current++;
 if(this.current > this.max)
  this.current = 0;
 this.refresh();
}

Menu.prototype.refresh = function() {
 switch(this.current) {
  case 0: this.block.x = 358; this.block.y = 203; break;
  case 1: this.block.x = 338; this.block.y = 303; break;
  case 2: this.block.x = 308; this.block.y = 403; break;
 }
}

Menu.prototype.enter = function() {
 switch(this.current) {
  case 0: p2mode = false; transitionTo('game'); break;
  case 1: p2mode = true; transitionTo('game'); break;
  case 2:
   this.instructionsText.destroy(true);
   this.current = 0;
   this.refresh();
   this.max = 1;
   createText(450, 400, 'Use left and right arrow keys for movement,', 'apple2', 2).anchor.setTo(0.5, 0);
   createText(450, 430, 'up for placing a block and down for rotating it.', 'apple2', 2).anchor.setTo(0.5, 0);
   createText(450, 460, 'A and D for second players\'s movement,', 'apple2', 2).anchor.setTo(0.5, 0);
   createText(450, 490, 'S for placing and W for rotating.', 'apple2', 2).anchor.setTo(0.5, 0);
   createText(450, 520, 'Press ESC to return to menu.', 'apple2', 2).anchor.setTo(0.5, 0);
 }
}
