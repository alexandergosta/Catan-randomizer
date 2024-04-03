import { resourceColors } from './main.js';
import { shuffleArray } from './shuffleArray.js';

// Assign resource function
export function assignResources(resourceArray, hexagons, desertHex) {
    //Shuffle resoruces
    shuffleArray(resourceArray);
    //Remove Desert
    //hexagons.splice(desertHex-1,1);
    //hexagons[desertHex].resource = 'desert'

    for (let i = 0; i < hexagons.length; i++) {
        /*if (hexagons[i].resource === 'desert') {
            // If the resource is 'desert', continue to the next iteration
            continue;
        }*/
        //hexagons[i].draw(resourceColors[resourceArray[i]]);
        hexagons[i].draw();
        //hexagons[i].resourcetype = resourceArray[i];
    }
    console.log("Tiles scrambled");
}
