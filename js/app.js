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

//Player class constructor function
var Player = function() {
  this.xMin = 0;
  this.yMin = 0;
  this.xMax = 420; //window.ctx.canvas.width
  this.yMax = 440;
  this.speed = 20;
  this.score = 0;
  this.sprite = 'images/char-boy.png';
  this.init();
};

//Player update function
Player.prototype.update = function() {
  if(this.x < this.xMin)
    this.x = this.x + this.speed;

  if(this.y <= this.yMin){
    this.score += 1;
    document.getElementById('score').textContent = this.score;
    this.checkScore();
    this.init();
  }


  if(this.x > this.xMax)
    this.x = this.x - this.speed;

  if(this.y > this.yMax)
    this.y = this.y - this.speed;
};


//initialize player and resend to start position
Player.prototype.init = function() {
  this.y = 440;
  this.x = 220;
};


//render player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handle keys for player
//movement in all 4 directions is allowed within the board
Player.prototype.handleInput = function(key) {
    if(key === 'left')
        this.x = this.x - this.speed;
    else if(key === 'right')
        this.x = this.x + this.speed;
    else if(key === 'up')
        this.y = this.y - this.speed;
    else if(key === 'down')
        this.y = this.y + this.speed;
};

//Winning score is set to 5 , game restarts on clicking play again button
Player.prototype.checkScore = function() {
    if(this.score === 5) {
        document.getElementById("congrats").style.visibility = 'visible';
    }
};

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

//Event listener for play again button
document.querySelector('#replay').addEventListener('click', function() {
  player.score = 0;
  document.getElementById('score').textContent = player.score;
  document.getElementById("congrats").style.visibility = 'hidden';
});