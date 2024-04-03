import NumberCircle from './NumberCircle-class.js';
import { ctx } from './main.js';
import { shuffleArray } from './shuffleArray.js';

// Assign number function
export function assignNumbers(numberArray, hexagons, size, desertHex) {
    //Shuffle numbers
    shuffleArray(numberArray);

    for (let i = 0; i < hexagons.length; i++) {
        if (hexagons[i].resource === 'desert') {
            // If the resource is 'desert', continue to the next iteration
            continue;
        }
        const number = new NumberCircle(hexagons[i].x, hexagons[i].y, size / 2.3, ctx);
        number.drawNumber(numberArray[i]);
    }
    console.log("numbers scrambled");
}
