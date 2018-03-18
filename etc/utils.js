function createSprite(x, y, name, scaleX, scaleY) {
 var sprite = game.add.sprite(x, y, name);
 sprite.scale.setTo(scaleX, scaleY);
 sprite.smoothed = false; 
 return sprite;
}

function createButton(x, y, name, func, context, s) {
 var button = game.add.button(x, y, name, func, context, s[0], s[1], s[2]);
 button.smoothed = false; 
 return button;
}

function createText(x, y, text, font, scale) {
 var text = game.add.bitmapText(x, y, font, text, 8*scale); 
 text.smoothed = false;
 return text;
}

function transitionTo(state) {
 var sprite = createSprite(0, 0, 'black', 900, 600);
 sprite.fixedToCamera = true;
 sprite.alpha = 0;
 var tween = game.add.tween(sprite);
 tween.to({alpha:1}, 450);
 tween.onComplete.add(function() {
 // sprite.destroy(true);
  game.state.start(state);
 }, this);
 tween.start();
}

function transitionOut() {
 var sprite = createSprite(0, 0, 'black', 900, 600);
 sprite.fixedToCamera = true;
 sprite.alpha = 1;
 var tween = game.add.tween(sprite);
 tween.to({alpha:0}, 450);
 tween.onComplete.add(function() {
  sprite.destroy(true);
 }, this);
 tween.start();
}
