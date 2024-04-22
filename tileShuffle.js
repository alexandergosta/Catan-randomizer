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

const numbers4p = ['10', '2', '9', '12', '6', '4', '10', '9', '11', '3', '8', '8', '3', '4', '5', '5', '6', '11']

// The shuffleButton function selects all polygons except the polygon with the class "desert"
// and randomly swaps their classes.
document.getElementById('shuffleButton').onclick = function() {
        const polygons = document.querySelectorAll('polygon[id^="hex"]');
        const filteredPolygons = Array.from(polygons).filter(poly => poly.getAttribute('class') !== 'desert');
        const classes = filteredPolygons.map(poly => poly.getAttribute('class'));
        const shuffledClasses = shuffle(classes);

        let shuffledIndex = 0;
        polygons.forEach((polygon) => {
            if (polygon.getAttribute('class') !== 'desert') {
                polygon.setAttribute('class', shuffledClasses[shuffledIndex]);
                shuffledIndex++;
            }
        });
    };

// The shuffleDesert function randomly selects a polygon from a specific list and swaps its class with 
// the class of the polygon with the "desert" class.
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

//The placeDesertCenter.onclick function swaps the class of the polygon with ID "hex10" with the class of the polygon with the "desert" class.
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

document.getElementById('shuffleNumbers').onclick = function() {
    const numberElements = Array.from(document.querySelectorAll('text[id^="numtile"]:not([text-anchor="X"])')).filter(element => element.textContent !== 'X');
    const numbers = [...numbers4p];
    document.getElementById('msg').textContent = "";

    let numbersCopy = [...numbers];
    let counter = 0;
    const MAX_COUNTER = numbersCopy.length;

    while (counter < MAX_COUNTER) {
        shuffle(numbersCopy);

        let assigned = true;
        numberElements.forEach((element) => {
            const adjecentElementsIds = numAdjecency4p[element.id];
            const adjecentElements = adjecentElementsIds.map(id => document.getElementById(id));

            assigned = adjecentElements.every(adjElement => {
                if (adjElement.textContent === numbersCopy[counter]) {
                    return false;
                } else if (numbersCopy[counter] === "8" && adjElement.textContent.includes("6")) {
                    return false;
                } else if (numbersCopy[counter] === "6" && adjElement.textContent.includes("8")) {
                    return false;
                }

                return true;
            });

            if (assigned) {
                element.textContent = numbersCopy[counter];
                element.setAttribute('class', numbersCopy[counter] === "6" || numbersCopy[counter] === "8" ? 'redtxt' : 'blacktxt');
                counter++;
            } else {
                assigned = false;
            }
        });

        if (assigned) {
            break;
        } else {
            counter = 0;

        }

    }
    if (numbersCopy.length === 0) {
        document.getElementById('msg').textContent = "Could not assign numbers properly. Try again.";
        console.error("Could not assign numbers properly. Infinite loop detected.");
    }
}
//Sliders
const sliders = document.querySelectorAll(".slidecontainer input[type='range']");

sliders.forEach(function(slider) {
  const value = slider.previousElementSibling;

  slider.addEventListener("input", function() {
    if (this.id === 'numSlider' && this.value === '1') {
      value.textContent = "all random";
    }  else if (this.id === 'hexSlider' && this.value === '1') {
        value.textContent = "all random";
    } else if (this.id === 'numSlider' && this.value === '2') {
      value.textContent = "not 6,8 and 2,12";
    }  else if (this.id === 'hexSlider' && this.value === '2') {
        value.textContent = "no hexes";
    } else if (this.id === 'numSlider' && this.value === '3') {
      value.textContent = "no adjecent";
    }  else if (this.id === 'hexSlider' && this.value === '3') {
        value.textContent = "no hexes or ports"
  }
});

});
