// Fisher–Yates Shuffle

export function shuffleArray(array) {
    // Create an array of indices for non-"desert" elements
    const nonDesertIndices = array.reduce((indices, element, index) => {
        if (element !== "desert") {
            indices.push(index);
        }
        return indices;
    }, []);

    // Shuffle the non-"desert" elements
    for (let i = nonDesertIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[nonDesertIndices[i]], array[nonDesertIndices[j]]] = [array[nonDesertIndices[j]], array[nonDesertIndices[i]]];
    }
}
