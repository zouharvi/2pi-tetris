GameCounter = function() {
 this.scoreText = createText(10, 10, 'score: 0', 'apple2', 2);
 this.timeLeftText = createText(890, 10, 'time: 30', 'apple2', 2);
 this.timeLeftText.anchor.setTo(1, 0);
 this.rotateCountdownText = createText(880, 580, '9', 'apple2', 2);

 this.time = 30;
 this.timeT = eightS;
 this.score = 0;
 this.count = 9;
 this.countDownT = eightS;

 updatables.push(this);
}

GameCounter.prototype.update = function() {
 if(eightS - this.countDownT >= 9 && !lost) {
  this.countDownT = eightS;
  if(this.count > 0) {
   this.count--;
   this.rotateCountdownText.setText(this.count.toString());
  }
 }

 if(eightS - this.timeT >= 9 && !lost) {
  this.timeT = eightS;
  this.decTime();
 }
 
}

GameCounter.prototype.reset = function() {
 this.count = 9;
 this.countDownT = eightS;
 this.rotateCountdownText.setText(this.count.toString());
}

GameCounter.prototype.incScore = function(val) {
 var sfx = game.add.audio('hit');
 sfx.volume = 0.3;
 sfx.play();
 this.score += val;
 this.scoreText.setText('score: ' + this.score);
}

GameCounter.prototype.decTime = function() {
 this.time--;
 this.timeLeftText.setText('time: ' + this.time);
 if(this.time <= 0) 
  gameLost();
}

GameCounter.prototype.incTime = function() {
 this.time+=4;
 this.timeLeftText.setText('time: ' + this.time);
}
