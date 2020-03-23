class Road {
    constructor() {
        this.lines = [];
        this.ready = false;
        var dl = 250;
        this.lines[0] = [];
        // for(let i = 0; i <= 360; i+= 60){
        //     this.lines[0].push(p5.Vector.fromAngle(radians(i)).mult(dl).add(width/2, height/2));
        // }
        // this.lines[1] = [];
        // for(let i = 0; i <= 360; i+= 60){
        //     this.lines[1].push(p5.Vector.fromAngle(radians(i)).mult(dl*5/3).add(width/2, height/2));
        // }
        // console.log(this.lines);
        
        // this.ready = true;

        loadJSON('terrain.json', this.loadTerrain);

    }

    show() {
        push();
        noFill();
        strokeWeight(1);
        stroke(255);
        // strokeJoin(ROUND);
        for (let line of this.lines) {
            beginShape();
            for (let point of line) {
                vertex(point.x, point.y);
            }
            endShape();
        }
        pop();
    }

    loadTerrain(loaded) {
        road.lines = [];
        Object.keys(loaded).forEach(function (key, keyIndex) {
            road.lines[keyIndex] = [];
            for(let pt of loaded[key]){
                road.lines[keyIndex].push(createVector(pt.x, pt.y));
            }
        });
        // console.log(road.lines);
        
        road.ready = true;
    }
}