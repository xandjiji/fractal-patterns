var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var center = {
    x: (canvas.width / 2),
    y: (canvas.height / 2)
}

var patternSize, iterations;

main();

function main() {
    setConstants();

    var initialPattern = generatePattern();
    var finalPattern = clonePattern(initialPattern);
    var newPattern = rotatePattern(finalPattern);    

    for(let i = 0; i < iterations; i++) {
        newPattern = rotatePattern(finalPattern);
        finalPattern = finalPattern.concat(newPattern);
    }

    context.fillStyle = '#' + Math.floor(Math.random()*16777215).toString(16);

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPattern(finalPattern);
}

function setConstants() {
    let number = Math.round(Math.random());

    // low iterations
    if(number) {        
        patternSize = Math.floor(Math.random() * 10000) + 10;
        iterations = Math.floor(Math.random() * 4) + 1;

    // high iterations
    } else {
        patternSize = Math.floor(Math.random() * 20) + 1;
        iterations = Math.floor(Math.random() * 6) + 10;
    }    
}

function rotatePattern(pattern) {
    
    let newPattern = clonePattern(pattern);

    let angle = (90 * Math.PI / 180);
    
    for(let i = 0; i < newPattern.length; i++) {
        newPattern[i].x = (pattern[i].x * Math.cos(angle)) - (pattern[i].y * Math.sin(angle));
        newPattern[i].y = (pattern[i].x * Math.sin(angle)) + (pattern[i].y * Math.cos(angle));
    }

    // conecting points
    let lastElement = pattern[pattern.length - 1];
    translateTo(newPattern, lastElement.x, lastElement.y);

    return newPattern;
}

function translateTo(pattern, x, y) {

    let origin = pattern[0];

    let offsetX = x - origin.x;
    let offsetY = y - origin.y;

    for(let i = 0; i < pattern.length; i++) {
        pattern[i].x += offsetX;
        pattern[i].y += offsetY;
    }
}

function clonePattern(pattern) {

    let newPattern = [];

    for(let i = 0; i < pattern.length; i++) {
        let newCoord = Object.assign({}, pattern[i]);
        newPattern.push(newCoord);
    }

    return newPattern;
}

function generatePattern() {
    let x = center.x;
    let y = center.y;
    let pattern = [];

    pattern.push({x, y});

    for(let i = 0; i < patternSize; i++) {
        
        let lastElement = pattern[pattern.length - 1];
        let mutant = mutate(lastElement);
        pattern.push(mutant);
    }

    function mutate(input) {

        let x = input.x + rng();
        let y = input.y + rng();
    
        return {x, y};
    }

    function rng() {
        return Math.round(Math.random() * 4) -2;        
    }
    return pattern;
}

function drawPattern(pattern) {
    for(let i = 0; i < pattern.length; i++) {
        context.fillRect(pattern[i].x, pattern[i].y, 1, 1);
    }
}
