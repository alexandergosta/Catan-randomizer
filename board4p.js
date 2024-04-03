import Hexagon from './hexagon-class.js';
import { ctx, hexagons } from './main.js';

// Draw the board 4 player function
export function board4p(size, rows) {
    for (let row = 0; row < rows; row++) {
        const hexagonsInRow = row < 3 ? 3 + row : 7 - row;
        const xOffset = (7 - hexagonsInRow) * size * Math.sqrt(3) * 0.5;
        const yOffset = size * 2;

        for (let col = 0; col < hexagonsInRow; col++) {
            const x = xOffset + col * size * Math.sqrt(3);
            const y = yOffset + size * 1.5 * row;
            const hex = new Hexagon(x, y, size, ctx);
            hex.draw();
            hexagons.push(hex);
        }
    }
}
