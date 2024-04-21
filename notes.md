Draw all the circles in illustrator. add X to desert tile.
Name them with the same numbers as the hexes.
add as inline HTML.
get all the text content and shuffle it and rearrange it exept for the one with desert tile which get the X.
Find out which number that contains desert and apply hide style to that numbercircle.

.button-74 {
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  padding: 0 18px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-74:hover {
  background-color: #fff;
}

.button-74:active {
  box-shadow: #422800 2px 2px 0 0;
  transform: translate(2px, 2px);
}

@media (min-width: 768px) {
  .button-74 {
    min-width: 120px;
    padding: 0 25px;
  }
}

//functions for finding polygon centers
function calculateCentroid(pointsString) {
    let points = pointsString.split(" ");
    let xSum = 0, ySum = 0, count = 0;

    for (let i = 0; i < points.length; i += 2) {
        xSum += parseFloat(points[i]);
        ySum += parseFloat(points[i + 1]);
        count++;
    }

    return { x: xSum / count, y: ySum / count };
}

//functions for finding polygon centers and adding them to an array
function findPolygonCenters() {
    const polygons = document.querySelectorAll('polygon[id^="hex"]');
    const centers = [];

    polygons.forEach(polygon => {
        // Skip polygons with the class "desert"
        if (polygon.getAttribute('class') !== 'desert') {
            const points = polygon.getAttribute('points');
            let centroid = calculateCentroid(points);
            centers.push(centroid);
    };
    
});
console.log(centers)
return centers;
};