var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d')

var center = {
    x: (cnv.width / 2),
    y: (cnv.height / 2)
}

render();

function render() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);


    var initialPattern = generatePattern();
    var newPattern = rotatePattern(initialPattern);    

    for(let i = 0; i < 10; i++) {
        newPattern = rotatePattern(initialPattern);
        initialPattern = initialPattern.concat(newPattern);
    }
    
    drawPattern(initialPattern);
}

function rotatePattern(pattern) {
    
    let newPattern = clonePattern(pattern);

    // rotating
    /* for(let i = 0; i < newPattern.length; i++) {
        newPattern[i].x = pattern[i].y * -1;
        newPattern[i].y = pattern[i].x;
    } */

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

    for(let i = 0; i < 9; i++) {

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
        return Math.round(Math.random() * 2) -1;
    }

    return pattern;
}

function drawPattern(pattern) {
    for(let i = 0; i < pattern.length; i++) {
        ctx.fillRect(pattern[i].x, pattern[i].y, 1, 1);
    }
}