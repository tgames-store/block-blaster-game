

//Create canvas
if (document.getElementById("blockblaster-canvas") == null){
    document.body.innerHTML += `<canvas id="blockblaster-canvas" width=${window.innerWidth} height=${window.innerHeight - 30}></canvas>`
}

//Globals Variables
//-----------------
var fps = 30;
var canvas = document.getElementById('blockblaster-canvas');
var ctx = canvas.getContext("2d");
var bgColor = "rgb(40,40,40)"
var ready;
var enemyScore;
var renderTimer = setInterval(render,1/fps*100);
var difficultyTimer;
var spawnTimer;
var spawntime;
var continueTimeout = null;
var gameTime;
var difficulty;
var score;
var highScore = getHighScore();
let adsCounter = 2;
var gameOver;
var entities = [];
var entitiesToRemove = []
var player;
var fader;
var tripleShotActive = false;
var tripleShotTimer;
var flash = false;
var bonusPointsMessage = false;
var tripleShotMessage = false;
let spareLife = true;
let resetButton = document.getElementById('restart');
let continueButton = document.getElementById('continue');
let skipButton = document.getElementById('skip');
let watchAdsContainer = document.querySelector('.watchAdsContainer')

//Global Functions
//----------------

//Reset app back to 'Ready?' Screen
function reset(tag) {
    if (!tag === 'init') {
        // Let game started each time else init
        tgames.gameStarted();
    }

    if (score > highScore) setHighScore(score);
    ready = true;
    enemyScore = 0;
    gameTime = 0;
    difficulty = 1;
    score = 0;
    spawntime = 1500;
    gameOver = false;
    spareLife = true;
    fader = 0;
    entities = [];
    entitiesToRemove = [];
    player = null;
    tripleShotActive = false;
    flash = false;
    clearTimers();
}

//Clear all timers
function clearTimers(){
    clearInterval(difficultyTimer);
    clearInterval(spawnTimer);
    clearInterval(tripleShotTimer);
}

//Initialize all timers
function initializeTimers(){
    difficultyTimer = setInterval(increaseDifficulty,2000 * ((difficulty + 20) / 20));
    spawnTimer = setInterval(spawnEnemy,spawntime);
}

//Initialize / Start game
function init(){
    // First init
    tgames.gameStarted();

    ready = false;
    clearTimers();
    initializeTimers();

    //Spawn player
    player = new Player();
    player.position.set(canvas.width / 2,canvas.height-player.size);
    player.render();
    entities.push(player);

}

//Update Entities
function updateEntities(){
    entities.forEach(function(e){
        if (e.position.y > canvas.height + 20){
            if (e.name == "Enemy"){
                enemyScore += 1;
            }
            removeEntity(e);
        }
        e.update(1/fps);
    })
}

function setHighScore(score) {
    window.localStorage.setItem('high-score', score);
    highScore = score;
}

function getHighScore() {
    try {
        return window.localStorage.getItem('high-score', score) || 0;
    } catch (e) {}

    return 0;
}

//Draw background
function drawBG(){
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

//Draw Score / HUD
function drawScore(){
    ctx.fillStyle = "#CCFF99";
    ctx.font = "24px sans-serif";
    ctx.fillText("Score: " + score,10,24);
    ctx.font = "16px sans-serif";
    ctx.fillText("High Score: " + highScore,10,48);
    var enemyScoreString = "";
    for (var i = 0; i < enemyScore; i++){
        enemyScoreString += "X";
    }
    ctx.font = "24px sans-serif";
    ctx.fillStyle = "#FF6666";
    ctx.fillText(enemyScoreString,canvas.width - 75,24);
    ctx.font = "16px sans-serif";
    ctx.fillText("Difficulty: " + difficulty,canvas.width/2 - 50,24);
}

//Draws some static.
//@param alpha transparency
function drawStatic(alpha){
    var s = 15 ;
    for (var x = 0; x < canvas.width; x+=s){
        for (var y = 0; y < canvas.width; y+=s){
            var n = Math.floor(Math.random() * 60);
            ctx.fillStyle = "rgba(" + n + "," + n + "," + n + "," + (Math.random() * alpha) + ")";
            ctx.fillRect(x,y,s,s);
        }
    }
}

//Draws 'Ready?' screen
function drawReadyScreen(){
    drawBG();
    //drawStatic(.25);
    drawScore();
    fader += .1 * 1/fps;
    ctx.fillStyle = "rgba(255,255,255," + fader + ")";
    ctx.font = "72px sans-serif";
    ctx.fillText("READY?",canvas.width / 2 - 140,canvas.height / 2);
    ctx.fillStyle = "rgba(255,255,255," + .5 + ")";
    ctx.font = "32px sans-serif";
    ctx.fillText("You have only 3 lives",canvas.width / 2 - 150,60 + canvas.height / 2);
    ctx.font = "36px sans-serif";
    ctx.fillText("Press to start",canvas.width / 2 - 100,120 + canvas.height / 2);
    drawScore();
}

//Draw all entities
function drawEntities(){
    entities.forEach(function(e){e.render();});
}

//Draw 'Game Over' screen
function drawGameOver(){
    ctx.fillStyle = "rgba(0,0,0,"+fader +")";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    drawStatic(fader/2);
    drawScore();
    fader += .1 * 1/fps
    ctx.fillStyle = "rgba(255,255,255," + fader + ")";
    ctx.font = "64px sans-serif";
    ctx.fillText("GAME OVER",canvas.width / 2 - 195,canvas.height / 2);

    resetButton.style.display = 'block';
}

// Resize canvas
function handleResize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight - 30;
    render();
    player.position.set(canvas.width / 2, canvas.height-player.size);
}

//Render everything
function render(){
    drawBG();
    drawEntities();
    drawScore();
    if ( flash ){
        drawFlash();
    }
    if ( bonusPointsMessage ) {
        drawBonusPointsMessage();
    }
    if ( tripleShotMessage ){
        drawTripleShotMessage();
    }
    if ( gameOver ) {
        // Only one game over call
        tgames.gameOver( score );

        if ( spareLife ) {
            drawContinueByAds();
        } else {
            drawGameOver();
        }
        return;
    }
    else if ( ready ) {
        drawReadyScreen();
        return;
    }

    updateEntities();
    entitiesToRemove.forEach(function(e){
        var idx = entities.indexOf(e);
        if (idx > -1) entities.splice(idx,1);
    })
    gameTime += 1/fps;
    if (enemyScore >= 3) {
        clearTimers();
        gameOver = true;
        fader = 0;
    }
}

//Return mouse position relative to canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return new Vector2(evt.clientX - rect.left,
        evt.clientY - rect.top)
}

//Click Event
function canvasClick(){
    if (gameOver) {
        // game over function
    }
    if (ready) {
        init();
        return;
    }

    //Fire Bullets
    fireBullet({x:0,y:-player.size},30);
    if (tripleShotActive){
        fireBullet({x:-player.size,y:-player.size},25);
        fireBullet({x:player.size,y:-player.size},25);
    }
    if (score > 0) score -= 1;

    if (score > 4000 && !tripleShotActive) {
        drawTripleShotMessage(' MODE');
        tripleShotActive = true;
    }
}

//Fire bullet from player
function fireBullet(offset,speed){
    var bullet = new Bullet();
    bullet.position.set(player.position.x + player.size/2 - bullet.size/2 + offset.x,
        player.position.y + player.size/2 - bullet.size/2 + offset.y);
    bullet.velocity.y = -speed;
    entities.push(bullet);
}

//Screen Flash
function drawFlash(){
    fader -= (.1 * 1/fps);
    ctx.fillStyle = "rgba(255,255,255," + fader + ")";
    ctx.fillRect(0,0,canvas.width,canvas.height)
    if (fader <= 0) {
        flash = false;
    }
}

function drawContinueByAds() {
    enemyScore = 0;
    ctx.fillStyle = "rgba(0,0,0," + fader + ")";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    drawStatic(fader/2);
    drawScore();
    fader += .1 * 1/fps
    ctx.fillStyle = "rgba(255,255,255," + fader + ")";
    ctx.font = "32px sans-serif";
    ctx.fillText("Continue by watch ads?",canvas.width / 2 - 170,canvas.height / 2);

    if (!continueTimeout) {
        continueTimeout = setTimeout(handleSkip, 12000);
    }

    watchAdsContainer.style.display = 'flex';
}

function handleSkip() {
    clearTimeout(continueTimeout);

    continueTimeout = null;

    watchAdsContainer.style.display = 'none';
    spareLife = false;
    drawGameOver();
}

//Draw Bonus points message
function drawBonusPointsMessage(){
    fader -= (.1 * 1/fps);
    ctx.fillStyle = "rgba(255,255,255," + fader + ")";
    ctx.font = "72px sans-serif";
    ctx.fillText("+250 POINTS!",canvas.width/2 - 220,canvas.height/2);
    if (fader <= 0) {
        bonusPointsMessage = false;
    }
}

//Draw Triple shot message
function drawTripleShotMessage(mode = '!'){
    fader -= (.1 * 1/fps);
    ctx.fillStyle = "rgba(255,255,255," + fader + ")";
    ctx.font = "48px sans-serif";
    ctx.fillText("TRIPLE SHOT" + mode,canvas.width/2 - 160,canvas.height/2);
    if (fader <= 0) {
        tripleShotMessage = false;
    }
}

//Activate power up effect
function activateEffect(type){
    if (type == "scoreBoost"){
        console.log("+250");
        fader = 1;
        bonusPointsMessage=true;
        score += 250;
    }
    else if (type == "tripleShot" && score < 4000){
        console.log("TRIPLE SHOT");
        fader = 1;
        tripleShotActive = true;
        tripleShotMessage = true;
        tripleShotTimer = setInterval(function(){
            tripleShotActive=false;
            clearInterval(tripleShotTimer);
        },10000);
    }
    else if (type == "bomb"){
        console.log("BOMB");
        flash = true;
        fader = 1;
        entities.forEach(function(e){
            if (e.name == "Enemy"){
                death(e);
            }
        })
    }
}

//Increment difficulty
function increaseDifficulty(){
    difficulty += 1;
    if (spawntime > 20) spawntime -= 20;
    if (difficulty % 5 == 0 && Math.random() > .5) spawnPowerUp();
    clearInterval(spawnTimer);
    spawnTimer = setInterval(spawnEnemy,spawntime);
}

//Change alpha of color
function setAlpha(color,alpha){
    if (color.indexOf('a') == -1){
        return color.replace(")",","+alpha+")").replace("rgb","rgba");
    }
}

//Entity death
function death(entity){
    if (entity.name == "Enemy") {
        var particleCount = Math.floor((Math.random() * 6) + 3);
        for (var i = 0; i < particleCount; i++){
            var p = new Particle();
            p.color = entity.color;
            p.size = Math.floor((Math.random() * entity.size/2) + 5);
            //p.position.set(entity.position.x+entity.size/2,entity.position.y+entity.size/2);
            var modx = (Math.random() * entity.size/2);
            var mody = (Math.random() * entity.size/2);
            p.position.x = entity.position.x + modx;
            p.position.y = entity.position.y + mody;
            entities.push(p);
        }
        score += 25;
    }
    else if (entity.name == "PowerUp"){
        var particleCount = Math.floor((Math.random() * 6) + 3);
        for (var i = 0; i < particleCount; i++){
            var p = new Particle();
            p.color = randomColor(100,255); //Rainbow colored particles
            p.size = Math.floor((Math.random() * entity.size/2) + 5);
            //p.position.set(entity.position.x+entity.size/2,entity.position.y+entity.size/2);
            var modx = (Math.random() * entity.size/2);
            var mody = (Math.random() * entity.size/2);
            p.position.x = entity.position.x + modx;
            p.position.y = entity.position.y + mody;
            entities.push(p);
        }
        activateEffect(entity.effect);
    }

    removeEntity(entity);
}

//Remove Entity
function removeEntity(entity){
    entitiesToRemove.push(entity);
    /*
    var idx = entities.indexOf(entity);
    if (idx > -1) entities.splice(idx,1);
    */
}

//Check if two entities overlap
function overlaps(entityA,entityB){
    var sa = entityA.size;
    var x1a = entityA.position.x;
    var x2a = entityA.position.x + sa;
    var y1a = entityA.position.y;
    var y2a = entityA.position.y + sa;
    var sb = entityB.size;
    var x1b = entityB.position.x;
    var x2b = entityB.position.x + sb;
    var y1b = entityB.position.y;
    var y2b = entityB.position.y + sb;

    return (x1a < x2b && x2a > x1b && y1a < y2b && y2a > y1b);
}

//Spawns new powerup
function spawnPowerUp(){
    var e = new PowerUp();
    var px = Math.floor((Math.random() * canvas.width));
    var py = -e.size;
    var v = (Math.random() * difficulty) + difficulty / 2;
    var a = Math.floor((Math.random() * (v + 15)) + v) / 2;
    var f = Math.floor((Math.random() * (v + 15)) + v) / 2;
    e.position.set(px,py);
    var r = Math.random();
    if (r > .5){
        straightDownMotion(e,v);
    }
    else if (r > .3){
        sineMotion(e,a,f,v);
    }
    else if (r > .1){
        triangularMotion(e,a,f,v);
    }
    else{
        sawtoothMotion(e,a,f,v);
    }
    entities.push(e);
}

//Spawns new enemy
function spawnEnemy(){
    var e = new Enemy();
    var px = Math.floor((Math.random() * canvas.width));
    var py = -e.size;
    //var v = difficulty;
    var v = (Math.random() * difficulty) + difficulty / 2;
    var a = Math.floor((Math.random() * (v + 15)) + v);
    var f = Math.floor((Math.random() * (v + 15)) + v);
    e.position.set(px,py);
    var r = Math.random();
    if (r > .5){
        straightDownMotion(e,v);
    }
    else if (r > .3){
        sineMotion(e,a,f,v);
    }
    else if (r > .1){
        triangularMotion(e,a,f,v);
    }
    else{
        sawtoothMotion(e,a,f,v);
    }
    entities.push(e);
}

//Straight down motion
function straightDownMotion(entity,speed){
    entity.update = function(deltatime){
        this.velocity.x = 0;
        this.velocity.y = speed;
        Entity.prototype.update.call(this,deltatime);
    }
}

//Define sin wave motion
function sineMotion(entity,amplitude,freq,speed){
    entity.update = function(deltatime){
        this.velocity.x = amplitude * Math.cos(this.position.y/freq);
        this.velocity.y = speed;
        Entity.prototype.update.call(this,deltatime);
    }
}

//Define saw tooth motion
function sawtoothMotion(entity, amplitude,freq,speed){
    var modifier = 1;
    if (Math.random() > .5) modifier = -1;
    entity.update = function(deltatime){
        this.velocity.x = modifier * ((-2*amplitude)/Math.PI)*Math.atan(1/Math.tan(this.position.y / freq));
        this.velocity.y = speed;
        Entity.prototype.update.call(this,deltatime);
    }
}

//Define triangular motion (sorta. More of a sine wave in the end really)
function triangularMotion(entity, amplitude,freq,speed){
    entity.update = function(deltatime){
        this.velocity.x = ((2*amplitude)/Math.PI)*Math.asin(Math.sin(this.position.y / freq));
        this.velocity.y = speed;
        Entity.prototype.update.call(this,deltatime);
    }
}

//Generate random rgba color string
function randomColor(min,max){
    var r = Math.floor((Math.random() * max) + min);
    var g = Math.floor((Math.random() * max) + min);
    var b = Math.floor((Math.random() * max) + min);
    var col = "rgb(" + r + "," + g + "," + b + ")";
    return col;
}

// Classes
//----------

//Vector2
var Vector2 = function(x1,y1){
    this.x = x1;
    this.y = y1;
}
Vector2.prototype.set = function(a,b){
    this.x = a;
    this.y = b;
}

//Entity (Base class)
var Entity = function(){
    this.name = "Entity";
    this.size = 25;
    this.position = new Vector2(0,0);
    this.velocity = new Vector2(0,0);
    this.color = "#FFFFFF";
}
Entity.prototype.sayName = function(){
    console.log(this.name);
}
Entity.prototype.update = function(deltaTime){
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
    //Keep in bounds
    if (this.position.x < 0) {this.position.x = this.size;}
    if (this.position.x + this.size > canvas.width) {this.position.x = canvas.width - this.size;}
}
Entity.prototype.render = function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x,this.position.y,this.size,this.size);
}

//Enemy Entity
var Enemy = function(){
    Entity.call(this);
    this.name = "Enemy";
    this.size = Math.floor((Math.random() * 50)+20);
    this.color = randomColor(90,150);
}
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Entity;
//Player Entity
var Player = function(){
    Entity.call(this);
    this.name = "Player";
    this.color = "#4747FF"
}
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Entity;

//Particle Entity
var Particle = function(){
    Entity.call(this);
    this.name = "Particle";
    this.size = 10;
    this.time = 0;
    this.maxTime = Math.floor((Math.random() * 10) + 3);
    this.velocity.x = Math.floor((Math.random() * 20) - 10);
    this.velocity.y = Math.floor((Math.random() * 20) - 10);
}
Particle.prototype = Object.create(Entity.prototype);
Particle.prototype.constructor = Entity;
Particle.prototype.update = function(deltatime){
    Entity.prototype.update.call(this,deltatime);
    this.time += deltatime;
    if (this.time >= this.maxTime) removeEntity(this);
}

//Bullet Entity
var Bullet = function(){
    Entity.call(this);
    this.name = "Bullet";
    this.size = 10;
    this.time = 0;
    this.color = "rgba(200,200,200,1)";
    this.particlesDelay = .7;
}
Bullet.prototype = Object.create(Entity.prototype);
Bullet.prototype.constructor = Entity;
Bullet.prototype.update = function(deltatime){
    Entity.prototype.update.call(this,deltatime);

    //Check for collisions
    var me = this;
    entities.forEach(function(e){
        if (e !== me && e.name != "Particle"){
            if (overlaps(me,e)){
                death(e);
                removeEntity(me);
            }
        }
    })
    //Remove from game if outside bounds
    if (this.position.y < 0) removeEntity(this);

    //Create particles
    this.time += deltatime;
    if (this.time >= this.particlesDelay){
        this.time = 0;
        var p = new Particle();
        p.size = Math.floor((Math.random() * 5)+2);
        p.color = setAlpha("rgb(125,125,125)",Math.random());
        //p.color = setAlpha(randomColor(100,255),Math.random()); //Rainbow colored particles
        p.velocity.x /=2;
        p.position.x = this.position.x + this.size /2 - p.size/2;
        p.position.y = this.position.y - p.size/2;
        entities.push(p);
    }
}

//PowerUp Entity
var PowerUp = function(){
    Entity.call(this);
    this.name = "PowerUp";
    this.size = 20;
    this.time = 0;
    this.particlesDelay = .25;
    var r = Math.random();
    if (r < .5){this.effect = "scoreBoost";}
    else if (r < .75){this.effect = "tripleShot";}
    else {this.effect = "bomb";}

}
PowerUp.prototype = Object.create(Entity.prototype);
PowerUp.prototype.constructor = Entity;
PowerUp.prototype.update = function(deltatime){
    Entity.prototype.update.call(this,deltatime);

    //Remove from game if outside bounds
    if (this.position.y < 0 || this.position.y+this.size > canvas.height) removeEntity(this);

    //Create particles
    this.time += deltatime;
    if (this.time >= this.particlesDelay){
        this.time = 0;
        var p = new Particle();
        p.size = Math.floor((Math.random() * 5)+2);
        p.color = setAlpha(randomColor(100,255),Math.random()); //Rainbow colored particles
        p.velocity.x /=2;
        p.position.x = this.position.x + this.size /2 - p.size/2;
        p.position.y = this.position.y - p.size/2;
        entities.push(p);
    }
}
PowerUp.prototype.render = function(){
    ctx.fillStyle = randomColor(100,255);
    ctx.fillRect(this.position.x,this.position.y,this.size,this.size);
}


//	These must remain at the bottom of this file & in this order //
//	============================================================ //

//HTML load event
document.addEventListener('DOMContentLoaded', reset('init'));

//Close
// document.getElementById("closeButton").onclick=function(){
//     self.close()
// }
//
// //Minimize
// document.getElementById("minimizeButton").onclick=function(){
//     minimize();
// }

canvas.addEventListener("click", canvasClick);

window.addEventListener("resize", handleResize);

resetButton.addEventListener('click',() => {
    if (adsCounter === 0 || adsCounter < 0) {
        // Show rewarded add, when user lose game each 3 times;
        tgames.showRewardedAd();
        adsCounter = 3;
    } else {
        adsCounter--;
    }

    reset('game');
    resetButton.style.display = 'none';
});

function handleTimeCounter(callBack) {
    let counter = document.createElement('div')
    counter.classList.add('counter');
    counter.innerHTML = '5';
    document.body.append(counter);

    let timeCounterInterval = setInterval(() => {
        if (+counter.innerHTML > 0) {
            counter.innerHTML = String(+counter.innerHTML - 1);
        } else {
            clearInterval(timeCounterInterval);
            counter.classList.remove('counter');
            callBack();
        }
    }, 1000);
}

continueButton.addEventListener('click', async () => {
    adsCounter--;
    watchAdsContainer.style.display = 'none';
    gameOver = false;
    clearTimeout(continueTimeout);
    continueTimeout = null;
    spareLife = false;

    try {
        // Let player to continue the game by watch ads
        tgames.continueGameAd()
            .then(() => {
                enemyScore = 0;
                tgames.gameStarted();
                handleTimeCounter(() => {
                    initializeTimers();
                    render();
                });
            });
    } catch (e) {
        handleTimeCounter(() => {
            initializeTimers();
            render();
        })
    }
})

skipButton.addEventListener('click', async () => {
    watchAdsContainer.style.display = 'none';
    clearTimeout(continueTimeout);
    spareLife = false;
    drawGameOver();
})

//Mouse move event
canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (player && !gameOver) player.position.x = mousePos.x;
}, false);