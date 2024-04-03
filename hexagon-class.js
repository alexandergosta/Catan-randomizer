
//import { resourceColors } from "./main";

export default class Hexagon {
    constructor(x, y, size, ctx, resourcetype='water') {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
        this.resourcetype = resourcetype;
    }

    // Function to draw a rotated hexagon with outline
    draw() {
        this.ctx.save(); // Save the current state of the canvas


        // Translate to the center of the hexagon
        this.ctx.translate(this.x, this.y);

        // Rotate the canvas
        this.ctx.rotate(Math.PI / 2); // 90 degrees


        // Draw the filled hexagon (inner)
        this.ctx.beginPath();
        this.ctx.moveTo(this.size * Math.cos(0), this.size * Math.sin(0));
        for (let side = 0; side < 7; side++) {
            this.ctx.lineTo(this.size * Math.cos(side * 2 * Math.PI / 6), this.size * Math.sin(side * 2 * Math.PI / 6));
        }
        this.ctx.closePath();
        this.ctx.fillStyle = "#87CEEB"; //resourceColors.water; // Set the fill color based on the resource
        this.ctx.fill();

        // Draw the hexagon outline (outer)
        this.ctx.beginPath();
        this.ctx.moveTo(this.size * Math.cos(0), this.size * Math.sin(0));
        for (let side = 0; side < 7; side++) {
            this.ctx.lineTo(this.size * Math.cos(side * 2 * Math.PI / 6), this.size * Math.sin(side * 2 * Math.PI / 6));
        }
        this.ctx.closePath();
        this.ctx.strokeStyle = '#000'; // Set the outline color
        this.ctx.lineWidth = 2; // Set the outline thickness
        this.ctx.stroke();

        this.ctx.restore(); // Restore the state of the canvas
    }

}
