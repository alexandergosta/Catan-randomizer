
//the ctx thingy draws over on top, does not change...

export default class Hexagon {
    constructor(x, y, size, ctx, resourcetype='water', number=null) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
        this.resourcetype = resourcetype;
        this.number = number
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
        this.ctx.fillStyle = "#87CEEB"; // Set the fill color based on the resource
        this.ctx.fill();
       
        // Draw the hexagon outline (outer)
        /*
        this.ctx.beginPath();
        this.ctx.moveTo(this.size * Math.cos(0), this.size * Math.sin(0));
        for (let side = 0; side < 7; side++) {
            this.ctx.lineTo(this.size * Math.cos(side * 2 * Math.PI / 6), this.size * Math.sin(side * 2 * Math.PI / 6));
        }
        this.ctx.closePath();
        */
        this.ctx.strokeStyle = '#000'; // Set the outline color
        this.ctx.lineWidth = 2; // Set the outline thickness
        this.ctx.stroke();

        this.ctx.restore(); // Restore the state of the canvas
    }
    addResource(resource, color) {
        this.resourcetype = resource

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
        this.ctx.fillStyle = color; // Set the fill color based on the resource
        this.ctx.fill();

        this.ctx.strokeStyle = '#000'; // Set the outline color
        this.ctx.lineWidth = 2; // Set the outline thickness
        this.ctx.stroke();

        this.ctx.restore(); // Restore the state of the canvas

    }
    addNumber(number) {
        // Save the current context state
        this.ctx.save();

        // Translate to the center of the circle
        this.ctx.translate(this.x, this.y);

        // Draw the white circle
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.size/2.7, 0, 2 * Math.PI);
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
