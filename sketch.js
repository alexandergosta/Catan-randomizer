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