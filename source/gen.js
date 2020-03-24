function nextGen() {


    let sum = 0;

    for (let car of cars) {
        sum += car.score;
    }


    for (let car of cars) {
        car.fitness = car.score / sum;
    }
    let oldCars = cars;
    if(restore_net && localStorage.getItem('nn'))
    var net_to_restore = NeuralNetwork.deserialize(localStorage.getItem('nn'));
    cars = [];
    for (let i = 0; i < TOTAL_CAR; i++) {
        cars[i] = pickBestCar(oldCars, net_to_restore);
    }
    restore_net = false;
    gen++;
}

function pickBestCar(oldCars, net_to_restore) {
    var index = 0;
    var r = random(1);

    while (r > 0) {
        r = r - oldCars[index].fitness;
        index++;
    }
    index--;

    let car = oldCars[index];
    let child = new Car(true, net_to_restore || car.brain);
    child.brain.mutate(mutate);
    return child;
}

function mutate(x) {
    if (random(1) < 0.1) {
        let offset = randomGaussian() * 0.5;
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}