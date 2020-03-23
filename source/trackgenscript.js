function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    pos = createVector();
}

var lines = [];
var cline = 0;
var pos;
var spd = 10;
function draw() {
    if (keyIsDown(UP_ARROW))
        pos.add(0, spd);
    else if (keyIsDown(DOWN_ARROW))
        pos.add(0, -spd);
    if (keyIsDown(RIGHT_ARROW))
        pos.add(-spd, 0);
    else if (keyIsDown(LEFT_ARROW))
        pos.add(spd, 0);
    background(30);
    push();
    translate(width / 4 + pos.x, height / 2 + pos.y);
    rect(0, 0, 30, 60);
    pop();
    stroke(255);
    noFill();
    for (let line of lines) {
        beginShape();
        for (let point of line) {
            vertex(point.x + pos.x, point.y + pos.y);
        }
        endShape();
    }
}


function mousePressed() {
    if (!lines[cline])
        lines[cline] = [];
    lines[cline].push({
        x: mouseX - pos.x,
        y: mouseY - pos.y
    });
}

function keyPressed() {
    if (key == 'e') {
        lines[cline].push({
            x: lines[cline][0].x,
            y: lines[cline][0].y
        });
        cline++;
    } else if (key == 's') {
        console.log(lines);

        saveJSON(lines, 'terrain.json');
    } else if (key == 'l') {
        loadJSON('terrain.json', loadTerrain);
    }
}

function loadTerrain(lter) {
    loaded = lter;
    secloaded = [];
    Object.keys(loaded).forEach(function (key, keyIndex) {
        secloaded[keyIndex] = loaded[key];
    });
    lines = secloaded;
}

var loaded;
var secloaded;