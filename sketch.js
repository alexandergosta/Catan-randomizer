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