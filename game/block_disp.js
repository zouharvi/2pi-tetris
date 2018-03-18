BlockDisp = function(p1) {
 this.scheme = blockSchemes[Math.floor(Math.random() * blockSchemes.length)].slice();
 this.group = game.add.group();
 
 dispSize = this.scheme[0].length;
 dispSize = this.scheme.length;

 for(var i = 0; i < dispSize; i++) {
  for(var j = 0; j < dispSize; j++) {
   var block = createSprite((j-Math.floor(dispSize/2))*9*3, (i-Math.floor(dispSize/2))*9*3, 'block', 3, 3);
   block.anchor.setTo(0.5, 0.5);
   block.frame = (this.scheme[i][j] == 0)?0:1;
   this.group.add(block);
  }
 }

 this.findMinMax();

 this.group.x = 435 + 15;
 if(p1) {
  this.group.y = game.scale.height - 9*3*3 - 30;
  this.blockY = 11+5;
 } else {
  this.group.y = + 9*3*3 + 30;
  this.blockY = 2;
 }
 this.blockX = 11-2;
};

BlockDisp.prototype.moveRight = function() {
 if(this.blockX >= gridSizeEx - dispSize - 3 - this.widthMax)
  return;
 this.group.x += 9*3;
 this.blockX++;
}

BlockDisp.prototype.moveLeft = function() {
 if(this.blockX <= 5 - this.widthMin)
  return;
 this.group.x -= 9*3;
 this.blockX--;
}

BlockDisp.prototype.morph = function() {
 gameCounter.incTime();
 this.group.destroy(true);
 var block = new Block(this.scheme, this.blockX, this.blockY);
 grid.updateGraphics();
 return block;
}

BlockDisp.prototype.transposeInvert = function() {
 for (var i = 0; i < dispSize; i++) {
  for (var j = 0; j < i; j++) {
   var temp = this.scheme[i][j];
   this.scheme[i][j] = this.scheme[j][i];
   this.scheme[j][i] = temp;
  }
 }
 for (var i = 0; i < Math.floor(dispSize/2); i++) {
  for(var j = 0; j < dispSize; j++) {
   var temp = this.scheme[i][j];
   this.scheme[i][j] = this.scheme[dispSize-1-i][j];
   this.scheme[dispSize-1-i][j] = temp;
  }
 }

 this.group.rotation -= Math.PI/2;
 this.findMinMax();

 this.testPositionValidity();
 this.testPositionValidity();
}

BlockDisp.prototype.findMinMax = function() {
 this.widthMax = 0;
 this.widthMin = dispSize;

 var merged = [false, false, false];

 for(var i = 0; i < dispSize; i++) {
  for(var j = 0; j < dispSize; j++) {
   if(this.scheme[i][j] == 1)
    merged[j] = true;
  }
 }

 var prevFalse = true;
 for(var i = 0; i < dispSize; i++) {
  if(merged[i] && i > this.widthMax)
   this.widthMax = i;
  if(merged[i] && i < this.widthMin)
   this.widthMin = i;
 }
}

BlockDisp.prototype.testPositionValidity = function() {
 if(this.blockX < 5 - this.widthMin)
  this.moveRight();
 else if(this.blockX >= 16 - this.widthMax)
  this.moveLeft();
}
