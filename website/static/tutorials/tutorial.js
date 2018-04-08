#!/usr/bin/env node

"use strict";
const rook = require('rookout/auto_start');

const animals = ["Aardvark",
    "Abyssinian",
    "Affenpinscher",
    "Akbash",
    "Akita",
    "Albatross",
    "Alligator",
    "Alpaca",
    "Angelfish",
    "Ant",
    "Zorse"];

function TestClass(number, animal) {
    this.number = number;
    this.animal = animal;
}

var iteration = 0;

function testFunction() {
    iteration += 1;

    var local_iteration = iteration;
    var obj = new TestClass(Math.random(), animals[Math.floor(Math.random() * animals.length)]);

    console.log('Iteration ' + iteration);
}

setInterval(testFunction, 5000);