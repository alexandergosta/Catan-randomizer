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

-  numberElements.forEach((element, index) => {
    -    element.textContent = numbers[index];
    -    element.setAttribute('class', numbers[index] === "6" || 
    -    numbers[index] === "8" ? 'redtxt' : 'blacktxt');  



// Shuffle numbers button
document.getElementById('shuffleNumbers').onclick = function() {
    const numberElements = Array.from(document.querySelectorAll
    ('text[id^="numtile"]:not([text-anchor="X"])')).filter(element => element.textContent !== 'X');
    const numbers = [...numbers4p];
    document.getElementById('msg').textContent = "";
    shuffle(numbers);

    let numbersCopy = [...numbers];

    numberElements.forEach((element) => {
        element.textContent = "Error";
    });

    // Assign the shuffled numbers to the text elements
    numberElements.forEach((element, index) => {
        
        const adjecentElementsIds = numAdjecency4p[element.id];
        const adjecentElements = adjecentElementsIds.map(id => document.getElementById(id));
        
        let assigned = false;
        let counter = 0;
        const MAX_COUNTER = numbersCopy.length;
        while (!assigned && counter < MAX_COUNTER) {
            const num = numbersCopy[counter];
            console.log("testnumer: ",num);
            assigned = adjecentElements.every(adjElement => {
                if (adjElement.textContent === num) {
                    return false;
                }
                else if (num === "8" && adjElement.textContent.includes("6")) {
                    return false;
                }
                else if (num === "6" && adjElement.textContent.includes("8")) {
                    return false;
                }
                
                return adjElement.textContent !== num;
            });
            if (!assigned) {
                counter = (counter + 1);
                if (counter >= MAX_COUNTER) {
                    document.getElementById('msg').textContent = "Could not assign numbers properly. Try again.";
                    console.error("Could not assign numbers properly. Infinite loop detected.");
                    break;
                }
            }
        }
        if (assigned) {
            console.log("assigned: ",numbersCopy[counter], " to ", element.id);
            element.textContent = numbersCopy[counter];

            element.setAttribute('class', numbersCopy[counter] === "6" || 
            numbersCopy[counter] === "8" ? 'redtxt' : 'blacktxt');

            numbersCopy.splice(counter, 1);
            
        };
    });
};