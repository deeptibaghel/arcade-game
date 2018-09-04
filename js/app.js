// Enemies our player must avoid

var Enemy = function() {
   this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  var canvasWidth = document.querySelector('canvas').getAttribute('width');

  this.x = this.x + Math.round(dt * this.speed);
  if(this.x >= canvasWidth)
      this.x = 0;
 };

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function() {
  this.xMin = 0;
  this.yMin = 0;
  this.xMax = 420; //window.ctx.canvas.width
  this.yMax = 440;
  this.speed = 10;
  this.score = 0;
  this.sprite = 'images/char-boy.png';
  this.init();
}

Player.prototype.update = function() {
  if(this.x < this.xMin)
    this.x = this.x + this.speed;

  if(this.y <= this.yMin){
    this.score += 1;
    document.getElementById('score').textContent= this.score;
    this.init();
  }


  if(this.x > this.xMax)
    this.x = this.x - this.speed;

  if(this.y > this.yMax)
    this.y = this.y - this.speed;
}

Player.prototype.init = function() {
  this.y = 440;
  this.x = 220;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if(key === 'left')
        this.x = this.x - this.speed;
    else if(key === 'right')
        this.x = this.x + this.speed;
    else if(key === 'up')
        this.y = this.y - this.speed;
    else if(key === 'down')
        this.y = this.y + this.speed;
}



var allEnemies = [];
var pathHeight = 83, waterHeight = 63;

//instantiate enemies
for(var i = 0; i < 4 ; i++) {
  var enemy = new Enemy();
  enemy.x = 0;
  enemy.y = waterHeight + pathHeight * i;
  enemy.speed = Math.round(Math.random() * 100) + 100;
  allEnemies.push(enemy);
}

//instantiate player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
