// Function to adjust desert position
import { shuffleArray } from './shuffleArray.js';
import { hexagons, resourceColors, resourceArray, numberArray} from './main.js';

function moveDesert(mode) {
    let newResourceArray = [...resourceArray];
    let newNumberArray = [...numberArray];

    if (mode === "center" ) {

        //Assign desert position
        hexagons[9].addResource('desert', resourceColors.desert);
        newResourceArray.splice(9,0,"desert");
        newNumberArray.splice(9,0,null);

        // Set all other hexagons to water
        for (let i = 0; i < hexagons.length; i++) {
            if (i !== 9) {
                hexagons[i].addResource('water', resourceColors.water);
            }
        }
        } else {

            let positions = [4,5,8,9,10,13,14];

            //Shuffle resoruces for positions
            shuffleArray(positions);

            //Assign desert position
            let pos = positions[0];

            // Add desert
            hexagons[pos].addResource('desert', resourceColors.desert);
            newResourceArray.splice(pos,0,"desert");
            newNumberArray.splice(pos,0,"desert");

            // Set all other hexagons to water
            for (let i = 0; i < hexagons.length; i++) {
                if (i !== pos) {
                    hexagons[i].addResource('water', resourceColors.water);
                }
            } 
        }
    return [newResourceArray, newNumberArray];
}

// Export the function
export { moveDesert };
