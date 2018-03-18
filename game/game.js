Game = function() {};

Game.prototype.create = function() {
 this.stage.backgroundColor = 0x000000;


 updatables = [];
 toRemove = [];
 eightS = 0;
 allowMorphing = true;
 blocksFalling = false;
 lost = false;
 typeToAssign = 1;

 gridSprite = spawnBackgroundGrid();
 controls = new Controls();
 gameCounter = new GameCounter();
 blockDisp = new BlockDisp(true);
 if(p2mode)
  blockDisp2 = new BlockDisp(false);
 
 game.time.events.loop(125, function() { if(!game.pause) eightS += 1; }, this);

 transitionOut();
}

var grid, gridSprite;
var typeToAssign;
var controls, gameCounter;
var blockDisp, blockDisp2;

var gridSize = 11;
var gridSizeEx = 21;
var dispSize = 3;

var allowMorphing, blocksFalling, lost, p2mode;

var updatables, toRemove;
var eightS;

Game.prototype.update = function() {
 if(game.pause)
  return;
 for(var i in updatables) {
  updatables[i].update();
 }

 while(toRemove.length != 0) {
  var index = updatables.indexOf(toRemove.pop());
  if(index != -1) 
   updatables.splice(index, 1);
 }
}

function gameLost() {
 lost = true;
 createText(450, 10, "You've lost! (ESC for menu)", 'apple2', 2).anchor.setTo(0.5, 0);
 if(GJAPI.bActive)
  GJAPI.ScoreAdd(0, gameCounter.score, gameCounter.score + ' points');
 else
  GJAPI.ScoreAddGuest(0, gameCounter.score, gameCounter.score + ' points', guest);
}
