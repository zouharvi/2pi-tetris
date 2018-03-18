function spawnBackgroundGrid() {
 var group = game.add.group();
 grid = [];

 for(var i = 0; i < gridSize + 10; i++) {
  grid.push([]);
  for(var j = 0; j < gridSize + 10; j++) {
   var obj = {};
   var block = createSprite((j-Math.floor(gridSizeEx/2))*9*3, (i-Math.floor(gridSizeEx/2))*9*3, 'block', 3, 3);
   block.anchor.setTo(0.5, 0.5);
   group.add(block);
   obj.sprite = block;
   
   if(i < 5 || i >= 16 || j < 5 || j >= 16)
    obj.type = -2;
   else
    obj.type = -1;
   grid[i].push(obj);
  }
 }

 group.x = 450;
 group.y = 300;

 grid.updatePhysics = _updateGridPhysics;
 grid.updateGraphics = _updateGridGraphics;
 grid.update = _gridUpdate;
 grid.checkWin = _gridCheckWin;
 grid.removeDuplicate = _gridRemoveDuplicate;
 grid.transposeInvert = _gridTransposeInvert;
 grid.animateRotation = _gridAnimateRotation;
 grid.remColumn = _gridRemColumn;
 grid.remRow = _gridRemRow;
 grid.checkLoss = _gridCheckLoss;
 grid.refreshT = 0;
 grid.rotateT = 0;

 grid.updateGraphics();

 updatables.push(grid);

 return group;
}

function _gridUpdate() {
 if(lost)
  return;
 if(eightS - this.refreshT >= 2) {
  this.refreshT = eightS;
  if(allowMorphing) {
   this.updatePhysics();
   this.updateGraphics();
  }
 }

 if(eightS - this.rotateT >= 80) {
  this.updatePhysics();
  this.updateGraphics();
  if(!blocksFalling) {
   this.rotateT = eightS;
   allowMorphing = false;
   this.checkLoss();
   this.transposeInvert();
   this.animateRotation();
   gameCounter.reset();
  }
 }
 
}

function _updateGridPhysics() {
 var dic = {};
 for(var i = 0; i < gridSizeEx; i++) {
  for(var j = 0; j < gridSizeEx; j++) {
   var block = grid[i][j].type;
   if(block <= 0)
    continue;
   // bottom half
   if(i > 10) {
    var blockAbove = grid[i-1][j].type;
    if(blockAbove != block && blockAbove > 0)
     dic[block] = false;
    if(dic[block] != false)
     dic[block] = true;
   // upper half
   } else if(i < 10) {
    var blockBelow = grid[i+1][j].type;
    if(blockBelow != block && blockBelow > 0)
     dic[block] = false;
    if(dic[block] != false)
     dic[block] = true;
   // middle
   } else if(i == 10) {
     dic[block] = false;
   }

  }
 }

 blocksFalling = false;
 // movement phase - bottom
 for(var i = Math.ceil(gridSizeEx/2); i < gridSizeEx; i++) {
  for(var j = 0; j < gridSizeEx; j++) {
   var block = grid[i][j];
   if(block.type < 0)
    continue;
   if(dic[block.type]) {
    blocksFalling = true;
    grid[i-1][j].type = block.type;
    if(i < 5 || i >= 16 || j < 5 || j >= 16)
     block.type = -2;
    else
     block.type = -1;
   }

  }
 }
 
 // movement phase - top
 for(var i = Math.floor(gridSizeEx/2)-1; i >= 0; i--) {
  for(var j = 0; j < gridSizeEx; j++) {
   var block = grid[i][j];
   if(block.type < 0)
    continue;
   if(dic[block.type]) {
    grid[i+1][j].type = block.type;
    if(i < 5 || i >= 16 || j < 5 || j >= 16)
     block.type = -2;
    else
     block.type = -1;
   }

  }
 }

 this.checkWin();

}

function _updateGridGraphics() {
 for(var i = 0; i < gridSizeEx; i++) {
  for(var j = 0; j < gridSizeEx; j++) {
   switch(grid[i][j].type) {
   case -2:
    grid[i][j].sprite.frame = 2;
    break;
   case -1:
    if(i == 10)
     grid[i][j].sprite.frame = 3;
    else
     grid[i][j].sprite.frame = 0;
    break;
   default:
    grid[i][j].sprite.frame = 1;
   }
  }
 }
}

function _gridTransposeInvert() {
 for (var i = 0; i < gridSizeEx; i++) {
  for (var j = 0; j < i; j++) {
   var temp = this[i][j];
   this[i][j] = this[j][i];
   this[j][i] = temp;
  }
 }
 for (var i = 0; i < Math.floor(gridSizeEx/2); i++) {
  for(var j = 0; j < gridSizeEx; j++) {
   var temp = this[i][j];
   this[i][j] = this[gridSizeEx-1-i][j];
   this[gridSizeEx-1-i][j] = temp;
  }
 }
}

function _gridAnimateRotation() {
 // old rotation method
 /*
 var tween = game.add.tween(gridSprite);
 var newRot = gridSprite.rotation - Math.PI/2;
 tween.to({rotation: newRot}, 125);
 tween.onComplete.add(function() {
  allowMorphing = true;
 }, this);
 tween.start();
 */
 var tween = game.add.tween(gridSprite);
 tween.to({alpha: 0}, 150);
 tween.onComplete.add(function() {

  gridSprite.rotation -= Math.PI/2;
  grid.updateGraphics();
  var tween = game.add.tween(gridSprite);
  tween.to({alpha: 1}, 150);
  tween.onComplete.add(function() {
   allowMorphing = true;
  }, this);
  tween.start();

 }, this);
 tween.start();
}

function _gridCheckWin() {
 // rows
 for(var i = 5; i < gridSizeEx-5; i++) {
  for(var j = 5; j < gridSizeEx-5; j++) {
   if(this[i][j].type <= 0)
    break;
   if(j == gridSizeEx - 6)
    this.remRow(i);
  }
 }
 
 // columns
 for(var i = 5; i < gridSizeEx-5; i++) {
  for(var j = 5; j < gridSizeEx-5; j++) {
   if(this[j][i].type <= 0)
    break;
   if(j == gridSizeEx - 6)
    this.remColumn(i);
  }
 }

}

function _gridRemoveDuplicate(type) {
 for(var i = 5; i < gridSizeEx-5; i++) {
  for(var j = 5; j < gridSizeEx-5; j++) {
   if(this[i][j].type == type)
    this[i][j].type = ++typeToAssign;
  }
 }
}

function _gridRemRow(i) {
 for(var j = 5; j < gridSize+5; j++) {
  grid.removeDuplicate(grid[i][j].type);
  grid[i][j].type = -1;
 }
 gameCounter.incScore(11);
}

function _gridRemColumn(i) {
 for(var j = 5; j < gridSize+5; j++) {
  grid.removeDuplicate(grid[j][i].type);
  grid[j][i].type = -1;
 }
 gameCounter.incScore(11);
}

function _gridCheckLoss() {
 for(var i = 0; i < gridSizeEx && !lost; i++) {
  for(var j = 0; j < gridSizeEx && !lost; j++) {
   if((i < 5 || i > 15 || j < 5 || j > 15) && grid[i][j].type > 0)
    lost = true;
  }
 }
 if(lost)
  gameLost();
}
