var cars = [];

var road;
var running = true;
const TOTAL_CAR = 100;

var campos;
const camspeed = 10;
var camscale = 1;
var restore_net = false;

var gen = 1;

var genspeed = 1;
const MAX_GEN_SPEED = 100;

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    campos = createVector();
    for (let i = 0; i < TOTAL_CAR; i++) {
        cars[i] = new Car(true);
    }
    // if(localStorage.getItem('nn'))
    //     nettodes = localStorage.getItem('nn');

    road = new Road();
}

var fps;

function draw() {
    background(10);
    push();
    if (keyIsDown(UP_ARROW))
        campos.add(0, camspeed);
    else if (keyIsDown(DOWN_ARROW))
        campos.add(0, -camspeed);
    if (keyIsDown(RIGHT_ARROW))
        campos.add(-camspeed, 0);
    else if (keyIsDown(LEFT_ARROW))
        campos.add(camspeed, 0);
    if (keyIsDown(107))
        camscale += 0.01;
    else if (keyIsDown(109))
        camscale -= 0.01;
    translate(campos.x, campos.y);
    scale(camscale);
    stroke(255);
    if (road.ready) {
        for (let gn = 0; gn < genspeed; gn++) {
            for (let i = 0; i < TOTAL_CAR; i++) {
                if (cars[i].run)
                    cars[i].update();
            }
        }
        road.show();
        let livecar = 0;
        for (let i = 0; i < TOTAL_CAR; i++) {
            if (cars[i].run) {
                cars[i].show();
                livecar++;
            }
        }
        if (livecar == 0) {
            // debugger;
            nextGen();
        }
    }
    pop();
    printInfo();
    var maxscore = Math.max(...cars.filter(car => car.run == true).map(car => car.score));
    // if(maxscore > 5000)
    //     nextGen();
}

function printInfo() {
    if (frameCount % 15 == 0)
        fps = floor(frameRate());

    push();
    fill(255);
    stroke(255);
    strokeWeight(0.5);
    textSize(20);
    text("FPS: " + fps, 10, 30);
    text("Gen: " + gen, 10, 60);
    text("Max speed: " + Math.max.apply(null, cars.filter(car => car.run == true).map(car => car.maxspeed)).toFixed(3), 10, 90);
    text("Curr. max speed: " + Math.max.apply(null, cars.filter(car => car.run == true).map(car => car.currentspeed)).toFixed(3), 10, 120);
    pop();
}


function keyPressed() {
    if (key == 'e') {
        if (running)
            noLoop();
        else
            loop();
        running = !running;
    } else if (key == 's') {
        if (genspeed == 1)
            genspeed = MAX_GEN_SPEED;
        else
            genspeed = 1;
    } else if (key == 'g') {
        nextGen();
    } else if (key == 'q') {
        var bestcar = cars.reduce((a, b) => a.currentspeed >= b.currentspeed ? a : b);
        localStorage.setItem('nn', bestcar.brain.serialize());
        localStorage.setItem('genstate', gen);
    } else if (key == 'r') {
        restore_net = true;
        if(a = localStorage.getItem('genstate'))
            gen = a;
        nextGen();
    }
}