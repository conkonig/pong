var
    ball = document.getElementById('ball');
player = document.getElementById('player');
enemy = document.getElementById('enemy');
playerScoreBoard = document.getElementById("player-score");
enemyScoreBoard = document.getElementById("enemy-score");
playerScore = 0;
enemyScore = 0;

//MOVEMENT VALUE PER FRAME//
ballDirectionX = 1;
ballDirectionY = 1;
enemyDirectionX = 1;

//FRAME RATE//
ballSpeed = 25;
myTimer = setInterval(timerTick, ballSpeed);



//POSITION VARIABLES//
arenaWidth = 480;
arenaHeight = 500;
enemyX = 50;
playerX = 50;
playerY = 490;
ballX = 50;
ballY = 50;
player.style.top = playerY;


//STARTING POSITIONS//
setElementX(ball, ballX);
setElementY(ball, ballY);
setElementX(enemy, enemyX);
setElementX(player, playerX);


//THE GAME LOOP!//
function timerTick() {

    //GET THE BALL MOVING//
    ballX = ballX + ballDirectionX;
    setElementX(ball, ballX);
    ballY = ballY + ballDirectionY;
    setElementY(ball, ballY);

    enemyX = enemyX + (ballDirectionX/1.5);
    setElementX(enemy, enemyX);

    //COLLISION DETECTION//
    switch (isBallHitWall()) {
        case 0:
            didEnemyMiss();
            break;
        case 1:
            didPlayerMiss();
            break;
        case 2:
            changeBallDirectionX(1);
            break;
        case 3:
            changeBallDirectionX(-1);
            break;
        default:
    }
    isBallHitPlayer();
    isBallHitEnemy();

    playerScoreBoard.innerText = playerScore;
    enemyScoreBoard.innerText = enemyScore;
}

function changeBallDirectionX(directionX) {
    ballDirectionX = directionX;
}

function changeBallDirectionY(directionY) {
    ballDirectionY = directionY;
}

function isBallHitWall() {
    var ballLeft = getElementX(ball),
        ballTop = getElementY(ball);
    if (ballLeft > arenaWidth) {
        return 3;
    } else if (ballLeft < 0) {
        return 2;
    } else if (ballTop > arenaHeight) {
        return 1;
    } else if (ballTop < 0) {
        return 0;
    }
    return 5;
}

function isBallHitEnemy() {
    var ballTop = getElementY(ball),
        ballLeft = getElementX(ball),
        ballRight = (ballLeft + ball.offsetWidth),
        enemyBottom = getElementY(enemy),
        enemyLeft = getElementX(enemy),
        enemyRight = (enemyLeft + enemy.offsetWidth);

    if (ballTop === enemyBottom && ballRight >= enemyLeft && ballLeft <= enemyRight){
        ball.style.background = 'red';
        changeBallDirectionY(1)
    }
}

function isBallHitPlayer() {
    var ballBottom = (getElementY(ball) + 10),
        ballLeft = getElementX(ball),
        ballRight = (ballLeft + ball.offsetWidth),
        playerTop = playerY,
        playerLeft = getElementX(player);
        playerRight = (playerLeft + player.offsetWidth);
        console.log(playerLeft);
        console.log(ballRight + "ball");

    if (ballBottom >= playerTop && ballRight >= playerLeft && ballLeft <= playerRight) {
        ball.style.background = 'red';
        changeBallDirectionY(-1)
    }
}

function didPlayerMiss() {
    ballX = 50;
    ballY = 50;
    playerX = 50;
    enemyX = 50;
    enemyScore += 1;
}
function didEnemyMiss() {
    ballX = 50;
    ballY = 50;
    playerX = 50;
    enemyX = 50;
    playerScore += 1;
}

function print_arrow_key(keyCodeNumber) {
    var LEFT = 37,
        UP = 38,
        RIGHT = 39,
        DOWN = 40;

    switch (keyCodeNumber) {
        case LEFT:
            // setElementX(player, );
            // moveElement(player, -1);
            playerX -= 5;
            break;
        case UP:
            console.log('up');
            break;
        case RIGHT:
            playerX += 5;
            break;
        case DOWN:
            console.log('down');
            break;
        default:
            console.log('Other character (not an arrow key)');
            break;
    }

    setElementX(player, playerX);
}

function checkKeycode(event) {
    var keyDownEvent = event || window.event,
        keycode = (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;
    print_arrow_key(keycode);
    return false;
}

document.onkeydown = checkKeycode;

function getElementX(el) {
    return parseInt(window.getComputedStyle(el, null).getPropertyValue('left'));
}

function getElementY(el) {
    return parseInt(window.getComputedStyle(el, null).getPropertyValue('top'));
}

function setElementX(el, x) {
    el.style.left = 'calc(' + x + '% - ' + (el.offsetWidth / 2) + 'px )';
}

function setElementY(el, y) {
    el.style.top = 'calc(' + y + '% - ' + (el.offsetHeight / 2) + 'px ) ';
}