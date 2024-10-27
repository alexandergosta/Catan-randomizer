/**
Functions for shuffling the tiles and numbers.
 */

//function shuffle that shuffles the elements of an array using the Fisher-Yates algorithm. 
//It randomly swaps elements in the array to achieve the shuffling effect.
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // ES6 destructuring swap
    }
    return array;
}

//adjecency array for 4 player board
const hexAdjecency4p = {
    "hex1": ["hex2", "hex4", "hex5"],
    "hex2": ["hex1", "hex3", "hex5", "hex6"],
    "hex3": ["hex2", "hex6", "hex7"],
    "hex4": ["hex1", "hex5", "hex8", "hex9"],
    "hex5": ["hex1", "hex2", "hex4", "hex6", "hex9", "hex10"],
    "hex6": ["hex2", "hex3", "hex5", "hex7", "hex10", "hex11"],
    "hex7": ["hex3", "hex6", "hex11", "hex12"],
    "hex8": ["hex4", "hex9", "hex13"],
    "hex9": ["hex4", "hex5", "hex8", "hex10", "hex13", "hex14"],
    "hex10": ["hex5", "hex6", "hex9", "hex11", "hex14", "hex15"],
    "hex11": ["hex6", "hex7", "hex10", "hex12", "hex15", "hex16"],
    "hex12": ["hex7", "hex11", "hex16"],
    "hex13": ["hex8", "hex9", "hex14", "hex17"],
    "hex14": ["hex9", "hex10", "hex13", "hex15", "hex17", "hex18"],
    "hex15": ["hex10", "hex11", "hex14", "hex16", "hex18", "hex19"],
    "hex16": ["hex11", "hex12", "hex15", "hex19"],
    "hex17": ["hex13", "hex14", "hex18"],
    "hex18": ["hex14", "hex15", "hex17", "hex19"],
    "hex19": ["hex15", "hex16", "hex18"]
}

const numAdjecency4p = {
    "numtile1": ["numtile2", "numtile4", "numtile5"],
    "numtile2": ["numtile1", "numtile3", "numtile5", "numtile6"],
    "numtile3": ["numtile2", "numtile6", "numtile7"],
    "numtile4": ["numtile1", "numtile5", "numtile8", "numtile9"],
    "numtile5": ["numtile1", "numtile2", "numtile4", "numtile6", "numtile9", "numtile10"],
    "numtile6": ["numtile2", "numtile3", "numtile5", "numtile7", "numtile10", "numtile11"],
    "numtile7": ["numtile3", "numtile6", "numtile11", "numtile12"],
    "numtile8": ["numtile4", "numtile9", "numtile13"],
    "numtile9": ["numtile4", "numtile5", "numtile8", "numtile10", "numtile13", "numtile14"],
    "numtile10": ["numtile5", "numtile6", "numtile9", "numtile11", "numtile14", "numtile15"],
    "numtile11": ["numtile6", "numtile7", "numtile10", "numtile12", "numtile15", "numtile16"],
    "numtile12": ["numtile7", "numtile11", "numtile16"],
    "numtile13": ["numtile8", "numtile9", "numtile14", "numtile17"],
    "numtile14": ["numtile9", "numtile10", "numtile13", "numtile15", "numtile17", "numtile18"],
    "numtile15": ["numtile10", "numtile11", "numtile14", "numtile16", "numtile18", "numtile19"],
    "numtile16": ["numtile11", "numtile12", "numtile15", "numtile19"],
    "numtile17": ["numtile13", "numtile14", "numtile18"],
    "numtile18": ["numtile14", "numtile15", "numtile17", "numtile19"],
    "numtile19": ["numtile15", "numtile16", "numtile18"]
}

const portAdjecency4p = {
    "wheat": ["hex2", "hex3"],
    "wood": ["hex4", "hex8"],
    "rock": ["hex3", "hex7"],
    "sheep": ["hex16", "hex19"],
    "clay": ["hex8", "hex13"],
}

const numbers4p = [
'2',
'3','3',
'4','4',
'5','5', 
'6','6',
'8', '8',
'9', '9',
'10','10',
'11','11',
'12'
]

const resoruces4p = [
  'sheep', 'sheep', 'sheep', 'sheep',
  'wheat', 'wheat', 'wheat', 'wheat',
  'clay', 'clay',  'clay', 
  'rock',  'rock', 'rock',
  'wood', 'wood', 'wood', 'wood'
]

// The shuffleButton function selects all polygons except the polygon with the class "desert"
// and randomly swaps their classes according to the value of the hexSlider.
document.getElementById('shuffleButton').onclick = function() {
  const polygons = document.querySelectorAll('polygon[id^="hex"]');
  const filteredPolygons = Array.from(polygons).filter(poly => poly.getAttribute('class') !== 'desert');

  filteredPolygons.forEach((polygon) => {polygon.setAttribute('class', "")});

  // Assign the shuffled classes to the polygons
  let successfulShuffle = false;
  let counter = 0;
  while (successfulShuffle === false && counter < 20) {
    let unassignedPolygons = [];
    let shuffledIndex = 0;

    const classes = [...resoruces4p];
    let shuffledClasses = shuffle(classes);
    
    filteredPolygons.forEach((polygon) => {
      //all random mode
      
      if (!document.getElementById('allResorucesApart').checked && !document.getElementById('allPortsApart').checked) {
        polygon.setAttribute('class', shuffledClasses[shuffledIndex]);
        shuffledIndex++;
      
      // resoruces apart mode
      } else if (document.getElementById('allResorucesApart').checked && !document.getElementById('allPortsApart').checked) {
        const adjacentIds = hexAdjecency4p[polygon.id];
        const adjacentPolys = adjacentIds.map(id => document.getElementById(id));
        let assignedClass = false;

        shuffledClasses.some((shuffledClass) => {
          if (!adjacentPolys.some((adjacentPoly) => adjacentPoly.getAttribute('class') === shuffledClass)) {
            polygon.setAttribute('class', shuffledClass);
            assignedClass = true;
            shuffledClasses.splice(shuffledClasses.indexOf(shuffledClass),1);
            return true; // Exit the loop once a class is assigned
          }
        });
        if (!assignedClass) {
          unassignedPolygons.push(polygon);
        }

      // ports apart mode
      } else if (document.getElementById('allPortsApart').checked && !document.getElementById('allResorucesApart').checked) {
        const adjacentIds = hexAdjecency4p[polygon.id];
        const adjacentPolys = adjacentIds.map(id => document.getElementById(id));
        let assignedClass = false;

        shuffledClasses.some((shuffledClass) => {
          if (!(shuffledClass in portAdjecency4p && portAdjecency4p[shuffledClass].includes(polygon.id))) {
            polygon.setAttribute('class', shuffledClass);
            assignedClass = true;
            shuffledClasses.splice(shuffledClasses.indexOf(shuffledClass),1);
            return true; // Exit the loop once a class is assigned
          } 
        });
        if (!assignedClass) {
          unassignedPolygons.push(polygon);
        }

      // resoruces and ports apart mode
      } else if (document.getElementById('allPortsApart').checked && document.getElementById('allResorucesApart').checked) {
        const adjacentIds = hexAdjecency4p[polygon.id];
        const adjacentPolys = adjacentIds.map(id => document.getElementById(id));
        let assignedClass = false;

        shuffledClasses.some((shuffledClass) => {
          if (!adjacentPolys.some((adjacentPoly) => adjacentPoly.getAttribute('class') === shuffledClass) &&
              !(shuffledClass in portAdjecency4p && portAdjecency4p[shuffledClass].includes(polygon.id))) {
            polygon.setAttribute('class', shuffledClass);
            assignedClass = true;
            shuffledClasses.splice(shuffledClasses.indexOf(shuffledClass),1);
            return true; // Exit the loop once a class is assigned
          }
        });
        if (!assignedClass) {
          unassignedPolygons.push(polygon);
        }
      }  
    }); // end filteredPolygons.forEach
    counter++;
    if (unassignedPolygons.length === 0) successfulShuffle = true; // Exit the loop once all classes have been assigned
  } // exit while loop
document.getElementById('msg').textContent = "Resources successfully shuffled.";
}

// Shuffle Desert 
document.getElementById('shuffleDesertButton').onclick = function() {
    const specificIds = ['hex5', 'hex6', 'hex9', 'hex11', 'hex14', 'hex15', 'hex10'];
    const specificPolygons = Array.from(document.querySelectorAll('polygon')).filter(poly => specificIds.includes(poly.id));
    
    if (specificPolygons.length === 0) {
        console.error('No polygons found with the specified IDs.');
        return;
    }
    let randomPolygon = null;

    // Randomly select one polygon from the filtered list
    if (document.getElementById('centerDesert').checked) {
      randomPolygon = specificPolygons.find(polygon => polygon.id === "hex10");
    } else {
      randomPolygon = specificPolygons[Math.floor(Math.random() * specificPolygons.length)];
    }
    
    // Find the polygon with class 'desert'
    const desertPolygon = document.querySelector('polygon.desert');
    
    if (!desertPolygon) {
        console.error('No polygon with class "desert" found.');
        return;
    }

    // Swap classes
    const tempClass = desertPolygon.getAttribute('class');
    desertPolygon.setAttribute('class', randomPolygon.getAttribute('class'));
    randomPolygon.setAttribute('class', tempClass);

    // Swap number //

    // Extract the numeric part from the polygon IDs using regex
    const desertNumber = desertPolygon.id.match(/\d+/)[0];
    const randomNumber = randomPolygon.id.match(/\d+/)[0];

    // Fetch the corresponding text elements
    const desertText = document.getElementById(`numtile${desertNumber}`);
    const randomText = document.getElementById(`numtile${randomNumber}`);
    const desertGroup = document.getElementById(`numgroup${desertNumber}`);
    const randomGroup = document.getElementById(`numgroup${randomNumber}`);

    if (desertText && randomText) {
        const tempText = desertText.textContent;
        const tempClassText = desertText.getAttribute('class');
        const tempStyle = desertGroup.getAttribute('class');

        desertText.textContent = randomText.textContent;
        randomText.textContent = tempText;

        randomText.setAttribute('class', tempClassText);
        desertText.setAttribute('class', randomText.getAttribute('class'));
        desertGroup.setAttribute('class', randomGroup.getAttribute('class'));
        randomGroup.setAttribute('class', tempStyle);

    } else {
        console.error('Text elements corresponding to the polygons could not be found.');
    }

};

// Shuffle numbers button
document.getElementById('shuffleNumbers').onclick = function() {
  const textElements = Array.from(document.querySelectorAll('text[id^="numtile"]')).filter(element => element.textContent !== 'X');
  document.getElementById('msg').textContent = "";
  textElements.forEach((element) => {element.textContent = "ERROR"});

  // Assign the shuffled numbers to the text elements
  let successfulShuffle = false;
  let counter = 0;
  while (successfulShuffle === false && counter < 20) {
    const numbers = [...numbers4p];
    shuffle(numbers);
    textElements.forEach((element) => {
    const adjacentIds = numAdjecency4p[element.id];
    const adjacentElements = adjacentIds.map(id => document.getElementById(id));
      
    for (let i = 0; i < numbers.length; i++) {
      //6 & 8 apart
      if (document.getElementById('6-8apart').checked){
        let assignedtoAdj = false;
        if (numbers[i] === '6') {
          if (adjacentElements.some(adjElement => adjElement.textContent.includes('6') ||
            adjElement.textContent.includes('8'))) {
              assignedtoAdj = true;
          }
        } else if (numbers[i] === '8') {
          if (adjacentElements.some(adjElement => adjElement.textContent.includes('6') ||
            adjElement.textContent.includes('8'))) {
              assignedtoAdj = true;
          }
        }
        if (assignedtoAdj) {
          continue;
        }
      }
      //2 & 12 apart
      if (document.getElementById('2-12apart').checked){
        let assignedtoAdj = false;
        if (numbers[i] === '2') {
          if (adjacentElements.some(adjElement => adjElement.textContent.includes('2') ||
            adjElement.textContent.includes('12'))) {
              assignedtoAdj = true;
          }
        } else if (numbers[i] === '12') {
          if (adjacentElements.some(adjElement => adjElement.textContent.includes('12') ||
            adjElement.textContent.includes('2'))) {
              assignedtoAdj = true;
          }
        }
        if (assignedtoAdj) {
          continue;
        }
      }

      if (document.getElementById('allApart').checked && 
      adjacentElements.some(adjElement => adjElement.textContent === numbers[i])) {
        continue; // Skip this number if it already exists in adjacentElements
      }
      element.textContent = numbers[i];
      element.setAttribute('class', numbers[i] === '2' || numbers[i] === '12' ? 'bluetxt' : numbers[i] === '6' || numbers[i] === '8' ? 'redtxt' : 'blacktxt');
      numbers.splice(i, 1);
      break; // Exit the loop after one number is assigned
    }
    }); // end element.forEach
  counter++;
  const errorElements = Array.from(document.querySelectorAll('text[id^="numtile"]')).filter(element => element.textContent === 'ERROR');
  if (errorElements.length === 0) successfulShuffle = true;
} // end of while loop
document.getElementById('msg').textContent = "Numbers successfully shuffled.";
}
