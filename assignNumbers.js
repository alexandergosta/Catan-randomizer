import { hexagons, numberArray } from './main.js';
import { shuffleArray } from './shuffleArray.js';

// Assign numbers function
export function assignNumbers(numbers) {
    //Shuffle resoruces for randomness
    shuffleArray(numbers);

    //Assign resources
    for (let i = 0; i < hexagons.length; i++) {
        let number = numbers[i];
        if (number !== "desert") {
            hexagons[i].addNumber(number);
        } else {
            console.log(`Skipping hexagon ${i + 1} (desert)`);
        }
    }
    console.log("Numbers scrambled");
}
