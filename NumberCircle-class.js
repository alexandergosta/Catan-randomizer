export default class NumberCircle {
    constructor(x, y, size, ctx) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
    }

    // Function to draw a number within a white circle
    drawNumber(number) {
        // Save the current context state
        this.ctx.save();

        // Translate to the center of the circle
        this.ctx.translate(this.x, this.y);

        // Draw the white circle
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#fff';
        this.ctx.strokeStyle = '#000'; // Set the outline color
        this.ctx.lineWidth = 2; // Set the outline thickness
        this.ctx.stroke();
        this.ctx.fill();

        // Draw the number
        this.ctx.fillStyle = '#000'; // Set the number color
        this.ctx.font = 'bold 24px Arial, bold, sans-serif'; // Set the font size and family

        // Check if the number is 8 or 6
        if (number === 8 || number === 6) {
            this.ctx.fillStyle = '#B22222'; // Set red color
            this.ctx.font = 'bold 30px Arial, bold, sans-serif'; // Set the font size and family
        }

        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(number.toString(), 0, 0);

        // Restore the original context state
        this.ctx.restore();

    }
}
