// Function to adjust desert position

function adjustDesertPosition(desertPosition, change) {
    desertPosition += change;
    if (desertPosition < 0) {
        desertPosition = 0;
    } else if (desertPosition > 18) {
        desertPosition = 18;
    }
    console.log(desertPosition)
    return desertPosition;
}

// Export the function
export { adjustDesertPosition };