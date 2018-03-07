var svgContainer = document.getElementById('svg-container');
var clearButton = document.getElementById('clear-button');

// Spawns the circle
var spawnCircle = function(x, y) {
    var svgns = "http://www.w3.org/2000/svg";
    var spawnedCircle = document.createElementNS(svgns, 'circle');
    spawnedCircle.setAttributeNS(null, 'cx', x);
    spawnedCircle.setAttributeNS(null, 'cy', y);
    spawnedCircle.setAttributeNS(null, 'r', 144);
    spawnedCircle.setAttributeNS(null, 'fill', '#00aeef');
    spawnedCircle.addEventListener('click', changeCircleColor, true);
    svgContainer.appendChild(spawnedCircle);
    return spawnedCircle;
};

// Event listener to spawn a circle at that location
var spawnCircleHere = function(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var spawnedCircle = spawnCircle(x, y);
};

var spawnRandomCircle = function(e) {
    var x = genRanXCoord();
    var y = genRanYCoord();
    var spawnedCircle = spawnCircle(x, y);
    svgContainer.removeChild(this);
    e.stopPropagation();
};

// Changes the color of the cirle
var changeCircleColor = function(e) {
    var ranColor = genRanColor();
    this.setAttributeNS(null, 'fill', ranColor);
    this.removeEventListener('click', changeCircleColor, true);
    this.addEventListener('click', spawnRandomCircle, true);
    e.stopPropagation();
};

// Test function
var genRanCoords = function() {
    console.log("(" + genRanXCoord() + "," + genRanYCoord() + ")");
};

// Generates a random x coordinate
var genRanXCoord = function() {
    var ranX = parseInt((Math.random() * parseInt(svgContainer.getAttribute('width'))), 10);
    console.log("Randomly generated X: " + ranX);
    return ranX;
};

// Generates a random y coordinate
var genRanYCoord = function() {
    var ranY = parseInt((Math.random() * parseInt(svgContainer.getAttribute('height'))), 10);
    console.log("Randomly generated Y: " + ranY);
    return ranY;
};

// Generates a random hexcode color
var genRanColor = function() {
    var colorgen = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    console.log("Generated color: " + colorgen);
    return colorgen; 
};

// Clears the SVG container
var clearSVG = function(e) {
    while (svgContainer.firstChild) {
        svgContainer.removeChild(svgContainer.firstChild);
    }
};

svgContainer.addEventListener('click', spawnCircleHere, false);
clearButton.addEventListener('click', clearSVG, true);