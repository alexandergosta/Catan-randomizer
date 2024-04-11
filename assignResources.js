import { hexagons, resourceColors } from './main.js';
import { shuffleArray } from './shuffleArray.js';

// Assign resource function
export function assignResources(resoruces) {
    //Shuffle resoruces for randomness
    shuffleArray(resoruces);

    //Assign resources
    for (let i = 0; i < hexagons.length; i++) {
        let resource = resoruces[i];
        hexagons[i].addResource(resource, resourceColors[resource]);
    }
    console.log("Tiles scrambled");
}
