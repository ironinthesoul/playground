let ship;
let asteroids = [];
let newasteroids = 10;
let lasers = [];
let destroyedradius = 10;
let pointsmultiplier = 100;
let score = 0;
let scorebox;
let instructions;
let framerate = 60;
let mousetimeout = null;
let cursorvisible = true;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(framerate);
    ship = new Ship();
    for (let i = 0; i < newasteroids; i++) {
        asteroids.push(new Asteroid());
    }
    scorebox = createDiv();
    scorebox.html('SCORE: 0');
    scorebox.id('scoreboxdiv');
    instructions = createDiv();
    instructions.html('<strong>&lt;</strong> Rotate left <strong>&gt;</strong> Rotate right <strong>Z</strong> Boost <strong>Space bar</strong> Fire');
    instructions.id('instructionsdiv');
    let highscore = getCookie("AsteroidsHighScore");
    if(highscore) {
        highscorebox = createDiv();
        highscorebox.html('HIGH SCORE: ' + highscore);
        highscorebox.id('highscoreboxdiv');

    }

}

function draw() {
    background(0);

    if(keyIsDown(188)) ship.setRotation(-0.1); // ,<
    if(keyIsDown(190)) ship.setRotation(0.1); //,>
    if(keyIsDown(90)) ship.boosting(true); // z

    if(asteroids.length == 0) {
        gameIsOver(1);
    }

    for(let asteroid of asteroids) {
        if(ship.hits(asteroid) && frameCount > framerate * 3) {
            gameIsOver();
            break;
        }
        asteroid.render();
        asteroid.update();
        asteroid.edges();
    }


    for(let i = lasers.length - 1; i >= 0; i--) {
        lasers[i].render();
        lasers[i].update();
        if(lasers[i].offscreen()) {
            lasers.splice(i, 1);
        }
        else {
            for(let j = asteroids.length - 1; j >= 0; j--) {
                if(lasers[i].hits(asteroids[j])) {
                    if(asteroids[j].radius > destroyedradius) {
                        let newAsteroids = asteroids[j].destroy();
                        asteroids = asteroids.concat(newAsteroids);
                    }
                    score = score + (asteroids[j].points * pointsmultiplier);
                    asteroids.splice(j, 1);
                    lasers.splice(i, 1);

                    scorebox.html("SCORE: " + score);

                    break;
                }
            }
        }
    }

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();
}

keyReleased = ()=> {
    ship.setRotation(0);
    ship.boosting(false);
}

keyPressed = ()=> {
    if(keyCode == 32) {
        lasers.push(new Laser(ship.pos, ship.heading));
    }
}

gameIsOver = (state=0)=> {
    let text = 'GAME OVER';
    if(state == 1) text = 'YOU WIN!';

    let oldhighscore = getCookie("AsteroidsHighScore");
    if(score > oldhighscore) setCookie("AsteroidsHighScore", score, 90);

    gameover = createDiv();
    gameover.html(text);
    gameover.id('gameoverdiv');
    gameover.center();
    noLoop();
}

document.addEventListener("click", (e)=> {
    if(e.target && e.target.id == "gameoverdiv") {
        console.log("PRESSED");
        window.location.reload();
    }
});


setCookie = (name, value, days)=> {
    let expires = "";
    if(days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
getCookie = (name)=> {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while(c.charAt(0)==' ') c = c.substring(1,c.length);
        if(c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
deleteCookie = (name)=> {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


hideCursor = ()=> {
    mousetimeout = null;
    document.body.style.cursor = "none";
    cursorvisible = false;
}
document.onmousemove = function() {
    if(mousetimeout) {
        window.clearTimeout(mouseTimer);
    }
    if(!cursorvisible) {
        document.body.style.cursor = "default";
        cursorVisible = true;
    }
    mousetimeout = window.setTimeout(hideCursor, 3000);
};
