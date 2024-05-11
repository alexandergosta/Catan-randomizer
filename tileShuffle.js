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
  'wood', 'wood', 'wood', 'wood']

// The shuffleButton function selects all polygons except the polygon with the class "desert"
// and randomly swaps their classes according to the value of the hexSlider.
document.getElementById('shuffleButton').onclick = function() {
  const polygons = document.querySelectorAll('polygon[id^="hex"]');
  const filteredPolygons = Array.from(polygons).filter(poly => poly.getAttribute('class') !== 'desert');
  
  const mode = document.getElementById('hexSlider').value;

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
      if (mode === '1') {
        polygon.setAttribute('class', shuffledClasses[shuffledIndex]);
        shuffledIndex++;
      
      // resoruces apart mode
      } else if (mode === '2') {
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
      // resoruces and ports apart mode
      } else if (mode === '3') {
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

    // Randomly select one polygon from the filtered list
    const randomPolygon = specificPolygons[Math.floor(Math.random() * specificPolygons.length)];
    
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

//Center desert
document.getElementById('placeDesertCenter').onclick = function() {
    const centerHex = document.getElementById('hex10');
    const currentDesert = document.querySelector('polygon.desert');
    // Extract the numeric part from the polygon IDs using regex
    const desertNumber = currentDesert.id.match(/\d+/)[0];
    const centerNumber = centerHex.id.match(/\d+/)[0];

    if (currentDesert && centerHex) {
        // Swap classes
        const tempClass = centerHex.getAttribute('class');
            // Swap number

    // Fetch the corresponding text elements
    const desertText = document.getElementById(`numtile${desertNumber}`);
    const centerText = document.getElementById(`numtile${centerNumber}`);
    const desertGroup = document.getElementById(`numgroup${desertNumber}`);
    const centerGroup = document.getElementById(`numgroup${centerNumber}`);

    if (desertText && centerText) {
        const tempText = desertText.textContent;
        const tempClassText = desertText.getAttribute('class');
        const tempStyle = desertGroup.getAttribute('class');

        desertText.textContent = centerText.textContent;
        centerText.textContent = tempText;

        desertText.setAttribute('class', centerText.getAttribute('class'));
        desertGroup.setAttribute('class', centerGroup.getAttribute('class'));
        centerText.setAttribute('class', tempClassText);
        centerGroup.setAttribute('class', tempStyle);

    } else {
        console.error('Text elements corresponding to the polygons could not be found.');
    }
        centerHex.setAttribute('class', currentDesert.getAttribute('class'));
        currentDesert.setAttribute('class', tempClass);
    } else {
        if (!centerHex) {
            console.error('No polygon found with the ID "hex10".');
        }
        if (!currentDesert) {
            console.error('No polygon with class "desert" found.');
        }
    }
};

// Shuffle numbers button
document.getElementById('shuffleNumbers').onclick = function() {
  const textElements = Array.from(document.querySelectorAll('text[id^="numtile"]')).filter(element => element.textContent !== 'X');
  const mode = document.getElementById('numSlider').value
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
      
    if (mode === '1') {
    // all random
        for (let i = 0; i < numbers.length; i++) {
        element.textContent = numbers[i];
        element.setAttribute('class', numbers[i] === '2' || numbers[i] === '12' ? 'bluetxt' : numbers[i] === '6' || numbers[i] === '8' ? 'redtxt' : 'blacktxt');
        numbers.splice(i, 1);
        break;
        }
    } else if (mode === '2') {
        // 6,8 and 2,12 apart
        for (let i = 0; i < numbers.length; i++) {
        
            if (numbers[i] === '6') {
              if (adjacentElements.some(adjElement => adjElement.textContent.includes('6') ||
                adjElement.textContent.includes('8'))) {
                continue;
              }
            } else if (numbers[i] === '8') {
              if (adjacentElements.some(adjElement => adjElement.textContent.includes('6') ||
                adjElement.textContent.includes('8'))) {
                continue;
              }
            } else if (numbers[i] === '2') {
                if (adjacentElements.some(adjElement => adjElement.textContent.includes('12'))) {
                  continue;
                }
            } else if (numbers[i] === '12') {
                if (adjacentElements.some(adjElement => adjElement.textContent.includes('2'))) {
                  continue;
                }
            }
            element.textContent = numbers[i];
            element.setAttribute('class', numbers[i] === '2' || numbers[i] === '12' ? 'bluetxt' : numbers[i] === '6' || numbers[i] === '8' ? 'redtxt' : 'blacktxt');
            numbers.splice(i, 1);
            break;
        }
    } else if (mode === '3') {
        // all apart
        for (let i = 0; i < numbers.length; i++) {
        
            if (adjacentElements.every(adjElement => adjElement.textContent !== numbers[i] && 
              (numbers[i] !== '2' || !adjElement.textContent.includes('12')) &&
              (numbers[i] !== '12' || !adjElement.textContent.includes('2')) &&
              (numbers[i] !== '6' || !adjElement.textContent.includes('8')) &&
              (numbers[i] !== '8' || !adjElement.textContent.includes('6')))) {
              element.textContent = numbers[i];
              element.setAttribute('class', numbers[i] === '2' || numbers[i] === '12' ? 'bluetxt' : numbers[i] === '6' || numbers[i] === '8' ? 'redtxt' : 'blacktxt');
              numbers.splice(i, 1);
              break;
            }
            }   
    }
    }); // end element.forEach
  counter++;
  const errorElements = Array.from(document.querySelectorAll('text[id^="numtile"]')).filter(element => element.textContent === 'ERROR');
  if (errorElements.length === 0) successfulShuffle = true;
} // end of while loop
document.getElementById('msg').textContent = "Numbers successfully shuffled.";
}


//Sliders
const sliders = document.querySelectorAll(".slidecontainer input[type='range']");

sliders.forEach(function(slider) {

  slider.addEventListener("input", function() {
    if (this.id === 'numSlider' && this.value === '1') {
      document.getElementById("numValue").textContent = "all random";
    }  else if (this.id === 'hexSlider' && this.value === '1') {
      document.getElementById("hexValue").textContent = "all random";
    } else if (this.id === 'numSlider' && this.value === '2') {
      document.getElementById("numValue").textContent = "6,8 and 2,12 apart";
    }  else if (this.id === 'hexSlider' && this.value === '2') {
      document.getElementById("hexValue").textContent = "resources apart";
    } else if (this.id === 'numSlider' && this.value === '3') {
      document.getElementById("numValue").textContent = "all apart";
    }  else if (this.id === 'hexSlider' && this.value === '3') {
      document.getElementById("hexValue").textContent = "resources and ports apart"
  }
});
})
