var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d')

cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

var center = {
    x: (cnv.width / 2),
    y: (cnv.height / 2)
}

var patternSize = 4;
var iterations = 16;

render();

function render() {

    var initialPattern = generatePattern();
    var newPattern = rotatePattern(initialPattern);    

    for(let i = 0; i < iterations; i++) {
        newPattern = rotatePattern(initialPattern);
        initialPattern = initialPattern.concat(newPattern);
    }
    
    drawPattern(initialPattern);
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

    ctx.fillStyle = '#' + Math.floor(Math.random()*16777215).toString(16);

    for(let i = 0; i < pattern.length; i++) {
        ctx.fillRect(pattern[i].x, pattern[i].y, 1, 1);
    }
}
