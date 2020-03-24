class Car {
    constructor(ai, brain) {
        this.pos = createVector(width / 4, height / 2);
        this.w = 30;
        this.h = 60;
        this.angle = -90;
        this.speed = 2;
        this.maxspeed = 0;
        this.currentspeed = 5;
        this.avspeed;
        this.sumspd = 0;

        this.pospoints = new Array(4);


        this.ai = ai;
        this.score = 0;
        this.fitness = 0;
        this.run = true;

        this.rays;
        if (this.ai) {
            this.rays = [];
            for (var i = -160; i <= -20; i += 20) {
                this.rays.push(new Ray(i));
            }
        }
        if (brain) {
            this.brain = brain.copy();
        } else if (this.ai)
            this.brain = new NeuralNetwork(this.rays.length, this.rays.length, 2);
    }

    update() {
        if (!this.ai) {
            var up = false, down = false;
            if (keyIsDown(UP_ARROW)) {
                this.pos.add(p5.Vector.fromAngle(radians(this.angle)).mult(this.speed));
                up = true;
            } else if (keyIsDown(DOWN_ARROW)) {
                this.pos.add(p5.Vector.fromAngle(radians(this.angle)).mult(-this.speed));
                down = true;
            }
            if (keyIsDown(RIGHT_ARROW) && (up || down))
                this.angle += (up ? 1 : -1) * this.speed * 2 / 3;
            else if (keyIsDown(LEFT_ARROW) && (up || down))
                this.angle -= (down ? -1 : 1) * this.speed * 2 / 3;
        } else {
            this.pospoints[0] = createVector(-this.w / 2, -this.h / 2).rotate(radians(this.angle + 90));
            this.pospoints[1] = createVector(this.w / 2, -this.h / 2).rotate(radians(this.angle + 90));
            this.pospoints[2] = createVector(this.w / 2, this.h / 2).rotate(radians(this.angle + 90));
            this.pospoints[3] = createVector(-this.w / 2, this.h / 2).rotate(radians(this.angle + 90));



            var inputs = new Array(this.rays.length);
            for (let i = 0; i < this.rays.length; i++) {
                var ray = this.rays[i];

                ray.update(this);
                inputs[i] = ray.powdist;
            }
            var mxinp = max(inputs);
            for (let i = 0; i < inputs.length; i++) {
                inputs[i] = inputs[i] / mxinp;
            }

            var output = this.brain.predict(inputs);


            // speed
            this.currentspeed = output[1] * 7 + 2;


            // angle
            var skr = (output[0] - 0.5) * 2;
            if (!isNaN(skr))
                this.angle += skr * (20 / this.currentspeed);

            // podliczanie sredniej
            this.sumspd += this.currentspeed;
            this.avspeed = this.sumspd / this.score;
            this.score += this.currentspeed;
            this.maxspeed = max(this.maxspeed, this.currentspeed);


            this.pos.add(p5.Vector.fromAngle(radians(this.angle)).mult(this.currentspeed));
        }
    }

    show() {
        push();
        noFill();
        if (Math.max(...cars.filter(car => car.run == true).map(car => car.currentspeed)) == this.currentspeed)
            stroke(140, 255, 0);
        else if (!this.ai)
            stroke(255, 255, 0);
        else
            stroke(255, 140, 0);

        if (this.run)
            strokeWeight(3);
        else
            strokeWeight(1);
        strokeJoin(ROUND);
        translate(this.pos.x, this.pos.y);
        rotate(radians(this.angle + 90));
        rect(0, 0, this.w, this.h);
        pop();
        push();
        if (this.ai && this.run) {
            strokeWeight(10);
            stroke('blue');
            for (let ray of this.rays) {
                ray.show();
            }
        }
        pop();
    }

    stop() {
        this.run = false;
        this.score = this.score;
    }
}

//liczenie max
//Math.max(...cars.filter(car => car.run == true).map(car => car.maxspeed))
//Math.max(...cars.filter(car => car.run == true).map(car => car.currentspeed))