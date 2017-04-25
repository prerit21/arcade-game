// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    //random speed selected for enemy bugs
    this.speed = Math.floor(Math.random() * (220) + 200);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiply enemy speed by the dt parameter to get
    // the distance travelled by enemy in one move
    // and ensures the game runs at the same speed for
    // all computers.
    var move = this.speed * dt;
    this.x = this.x + move;
    // Resets the enemy position
    this.Reset();
    // Checks for collision with player
    this.Collision();
};
//resets the enemy location to zero position
//if it goes pass the canvas
Enemy.prototype.Reset = function() {
    if (this.x >= 505) {
        this.x = -100;
    }
};
//checks for collision between enemy and player and resets the
//player if it collides
Enemy.prototype.Collision = function() {
    if (this.x - player.x < 30 && this.x - player.x > -30 &&
        this.y - player.y < 55 && this.y - player.y > -55) {
        player.x = 203;
        player.y = 400;
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// player class
//score keeps the winning score count
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
};
//updates player location if it goes pass the canvas
//adds score it it crosses the canvas
//generates winning alert if score count gets to three
Player.prototype.update = function() {
    if (this.y < 0) {
        this.y = 400;
        this.score++;
        document.getElementById("scoreDiv").innerHTML = "SCORE=" + this.score;
        if (this.score == 3) {
            alert("YOU WON");
            this.score = 0;
            document.getElementById("scoreDiv").innerHTML = "SCORE=" + this.score;
        }
    }
    if (this.y >= 400) {
        this.y = 400;
    }
    if (this.x >= 420) {
        this.x = 420;
    }
    if (this.x <= 0) {
        this.x = 0;
    }

}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// handleInput method for managing keys pressed
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            this.x = this.x - 60;
            break;
        case 'up':
            this.y = this.y - 60;
            break;
        case 'right':
            this.x = this.x + 60;
            break;
        case 'down':
            this.y = this.y + 60;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(203, 400);
var enemy = new Enemy(0, 80);
allEnemies.push(enemy);
var enemy2 = new Enemy(0, 300);
allEnemies.push(enemy2);
var enemy3 = new Enemy(0, 130);
allEnemies.push(enemy3);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});