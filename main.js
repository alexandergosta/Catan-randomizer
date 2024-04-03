//Save / load config
//move desert
//Change assingResources. add new function hexclass for setting color by resource type
//import { assignNumbers } from './assignNumbers.js';
import { assignResources } from './assignResources.js';
import { board4p } from './board4p.js';
//import { adjustDesertPosition } from './moveDesert.js';

const size = 60; // Size of the hexagon
const rows = 5; // Number of rows

let desertHex = 10;

// Calculate the width and height of the board
const width = size * Math.sqrt(3) * (rows + 0.5);
const height = size * 1.5 * (rows + 1);

const canvas = document.getElementById('catan-board');
export const ctx = canvas.getContext('2d');

// Resource colors
export const resourceColors = {
    "desert": "#F0E68C",
    "brick": "#B22222",
    "wood": "#228B22",
    "wheat": "#FFD700",
    "sheep": "#90EE90",
    "ore": "#808080",
    "water": "#87CEEB",
}

// ResourceArray for 4p
const resourceArray4p = [
    "brick","brick","brick",
    "wood","wood","wood","wood",
    "wheat","wheat","wheat","wheat",
    "sheep","sheep","sheep","sheep",
    "ore","ore","ore",
];
// Number array for 4p
const numberArray4p = [
    2,
    3,3,
    4,4,
    5,5,
    6,6,
    7,7,
    8,8,
    9,9,
    10,10,
    11,11,
    12,
]

export const hexagons = [];

//4 player setup
let resourceArray = resourceArray4p;
let numberArray = numberArray4p;

/*
// Move desert up
document.getElementById('desertUp').addEventListener('click', () => {
    // Create an array to store hexagons and their indexes

    //draw board
    //board4p(size,rows);
    desertHex = adjustDesertPosition(desertHex, -1);
    // Assign desert tile
    //hexagons[desertHex].draw(resourceColors.desert);
});
// Move desert down
document.getElementById('desertDown').addEventListener('click', () => {
    //draw board
    //board4p(size,rows);
    desertHex = adjustDesertPosition(desertHex, 1);
    // Assign desert tile
    //hexagons[desertHex].draw(resourceColors.desert);
});
*/

//Draw Board
board4p(size,rows);
// Assign desert tile
hexagons[desertHex].draw(resourceColors.desert); // Change this
hexagons[desertHex].resource = 'desert';
hexagons.splice(10, 1);
console.log(desertHex)
assignResources(resourceArray,hexagons, desertHex);
/*
//assign resoruces
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("scrambleTiles").addEventListener("click", function() {
        assignResources(resourceArray,hexagons, desertHex);
    });
});

//assign numbers
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("scrambleNumbers").addEventListener("click", function() {
        assignNumbers(numberArray, hexagons, size, desertHex);
    });
});*/
/*
// Initialize an empty adjacency matrix
const n = hexagons.length; // Number of hexagons
const adjMatrix = Array.from({ length: n }, () => Array(n).fill(0));

// Function to check if two hexagons share an edge (you'll need to implement this)
function shareEdge(hex1, hex2) {
    // Replace this with your actual logic to determine adjacency
    // For example, compare coordinates or other properties
    // Return true if they share an edge, otherwise false
    // Example: return hex1.x === hex2.x && Math.abs(hex1.y - hex2.y) === 1;
}

// Iterate through hexagons
for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
        // Check if hexagons i and j share an edge
        if (shareEdge(hexagons[i], hexagons[j])) {
            adjMatrix[i][j] = 1;
            adjMatrix[j][i] = 1; // Since the graph is undirected
        }
    }
}

// Now adjMatrix contains the adjacency information
// Each entry adjMatrix[i][j] indicates whether hexagons i and j are adjacent
*/