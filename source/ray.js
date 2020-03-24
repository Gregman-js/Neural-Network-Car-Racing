class Ray {
    constructor(angle) {
        this.angle = angle;
        this.dir = p5.Vector.fromAngle(radians(angle));
        this.pos;
        this.ray;
        this.powdist = 0;
    }

    update(car) {
        this.pos = car.pos.copy().add(p5.Vector.fromAngle(radians(car.angle)).mult(car.h / 2));
        this.dir = p5.Vector.fromAngle(radians(this.angle + car.angle + 90));
        this.ray = null;
        for (let line of road.lines) {
            for (let i = 0; i < line.length - 1; i++) {

                let x1 = line[i].x;
                let y1 = line[i].y;

                let x2 = line[i + 1].x;
                let y2 = line[i + 1].y;

                let x3 = this.pos.x;
                let y3 = this.pos.y;

                let x4 = this.pos.x + this.dir.x;
                let y4 = this.pos.y + this.dir.y;

                let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
                if (den == 0) {

                    continue;
                }

                let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
                let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
                if (t > 0 && t < 1 && u > 0) {
                    let pt = createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
                    if (this.ray == null)
                        this.ray = pt;
                    else {

                        let str1 = this.ray.x * this.ray.x - 2 * this.ray.x * this.pos.x + this.ray.y * this.ray.y - 2 * this.ray.y * this.pos.y;
                        let str2 = pt.x * pt.x - 2 * pt.x * this.pos.x + pt.y * pt.y - 2 * pt.y * this.pos.y;

                        if (str1 > str2)
                            this.ray = pt;

                    }
                }
            }
        }
        if (collide_with_cars)
            for (let col_car of cars)
                if (car !== col_car)
                    for (let i = 0; i < 4; i++) {
                        debugger;
                        let x1 = col_car.pos.x + col_car.pospoints[i].x;
                        let y1 = col_car.pos.y + col_car.pospoints[i].y;

                        let x2 = col_car.pos.x + col_car.pospoints[i != 3 ? i+1 : 0].x;
                        let y2 = col_car.pos.y + col_car.pospoints[i != 3 ? i+1 : 0].y;

                        let x3 = this.pos.x;
                        let y3 = this.pos.y;

                        let x4 = this.pos.x + this.dir.x;
                        let y4 = this.pos.y + this.dir.y;

                        let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
                        if (den == 0) {

                            continue;
                        }

                        let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
                        let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
                        if (t > 0 && t < 1 && u > 0) {
                            let pt = createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
                            if (this.ray == null)
                                this.ray = pt;
                            else {

                                let str1 = this.ray.x * this.ray.x - 2 * this.ray.x * this.pos.x + this.ray.y * this.ray.y - 2 * this.ray.y * this.pos.y;
                                let str2 = pt.x * pt.x - 2 * pt.x * this.pos.x + pt.y * pt.y - 2 * pt.y * this.pos.y;

                                if (str1 > str2)
                                    this.ray = pt;

                            }
                        }
                    }


        if (!this.ray) {
            car.stop();
            return;
        }
        var xx = this.pos.x - this.ray.x;
        var yy = this.pos.y - this.ray.y;
        this.powdist = Math.sqrt(xx * xx + yy * yy);
        if (this.powdist < 15) {
            car.stop();
        }


    }

    show() {
        push();
        if (this.ray) {
            stroke(255);
            strokeWeight(1);
            line(this.pos.x, this.pos.y, this.ray.x, this.ray.y)
            stroke('green');
            strokeWeight(5);
            point(this.ray.x, this.ray.y);

        }
        pop();
    }
}