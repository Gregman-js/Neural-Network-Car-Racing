# Neural-Network-Car-Racing
A small 2D simulation in which cars learn to drive by themselves using a neural network and genetics algorithms.  
Created by [Gregman-js](https://github.com/Gregman-js)

## Ready to use
Just visit and enjoy. [gregman-js.github.io/Neural-Network-Car-Racing/](https://gregman-js.github.io/Neural-Network-Car-Racing/)

## No requirements and dependencies
You don't need to install libraries and others dependencies.

## Important files
`index.html` - default page with car simulation  
`trackgen.html` - create your own terrain json file  
`terrain.json` - JSON file with track vectors, if you want, replace with your track  
`lib/` - folder with libraries  
`source/` - the hearth of simulation  

## Key features
Access following keys in simualtion:  
`e` - stop simulation  
`s` - 100x generation proccess  
`g` - force new generation  
`q` - save best car to localStorage  
`r` - restore neural network from localStorage  
`c` - turn on/off car collisions  
`←↓→` - control your camera position with arraw keys  
`+/-` - zoom in / out our camera

## Used library
* p5.js - [https://github.com/processing/p5.js](https://github.com/processing/p5.js)
* Toy-Neural-Network-JS - [https://github.com/CodingTrain/Toy-Neural-Network-JS](https://github.com/CodingTrain/Toy-Neural-Network-JS)