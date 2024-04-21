/**
Functions for shuffling the tiles and numbers.
 */

//functions for shuffling classes, swapping classes, and placing a class in the center.
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // ES6 destructuring swap
    }
    return array;
}

//The shuffleButton.onclick function shuffles the classes of polygons with IDs starting with "hex" and not having the class "desert".
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

//Shuffle numbers button
document.getElementById('shuffleNumbers').addEventListener('click', function() {
    // Fetch all number elements except the one with class 'desertNumber'
    const numberElements = Array.from(document.querySelectorAll('[id^="numgroup"]:not(.desertNumber)'));
    // Extract the numbers and corresponding text elements
    const numbers = numberElements.map(el => {
        const numberId = el.id;
        const textElement = document.getElementById(`numtile${numberId.substring(8)}`);
        return {
            numberId,
            textElement,
            originalText: textElement.textContent
        };
    });

    // Shuffle the array of numbers
    shuffle(numbers)

    // Assign the shuffled numbers to the text elements
    numbers.forEach((item, index) => {
        // Use the shuffled originalText from the corresponding shuffled position
        item.textElement.textContent = numbers[index].originalText;

        // Set classes based on the number immediately after updating the text
        if (item.textElement.textContent === '6' || item.textElement.textContent === '8') {
            item.textElement.className = 'redtxt';
        } else {
            item.textElement.className = 'blacktxt';
        }
    });

});