//This class draws groups of lines using a class.
//In this class, the start points'X location, start points'Y location, end points'X location, end points'Y location, angle, number of lines in each group, color, space, strokeWeight
//are used as parameters.
class lineGroup {
  constructor(startX, startY, endX, endY, angle, numLines, color, space, strokeWeight) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.angle = angle;
    this.numLines = numLines;
    this.color = color;
    this.lineSpacing = space; 
    this.strokeWeight = strokeWeight;
  }

  draw(offsetX = 0, offsetY = 0) {
    stroke(this.color); // Set the color of the lines.
    strokeWeight(this.strokeWeight); // Set the line thickness.

    // Draw each line in the group at an offset based on line spacing and angle.
    for (let i = 0; i < this.numLines; i++) {
      let lineOffsetX = cos(this.angle) * this.lineSpacing * i;
      let lineOffsetY = sin(this.angle) * this.lineSpacing * i;

      // Draw the line with the calculated offsets and additional mouse offset.
      line(this.startX + lineOffsetX + offsetX, this.startY + lineOffsetY + offsetY, 
           this.endX + lineOffsetX + offsetX, this.endY + lineOffsetY + offsetY);
    }
  }
}

class MovingCircle {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 3;
    this.color = color(random(255), random(255), random(255)); // Assign a random color
  }

  update() {
    // Move the circle along its angle
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    // Reset position if it goes out of bounds
    if (this.y > height || this.x < 0 || this.x > width || this.y < 0) {
      this.y = random(height); // Restart at random Y position
      this.x = random(width);  // Restart at random X position
    }
  }

  draw() {
    fill(this.color); // Use the random color
    noStroke();
    ellipse(this.x, this.y, 20, 20);
  }
}

// Storing the line groups and moving circle into arrays
let groups = [];
// Define moving circle array globally
let movingCircles = []; 
// operation mode is defined
let operationMode = ""; 
let colorMiddle
let colorTop; // Colors for middle and top layers

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  colorMiddle = color(128); // Initial shade of gray for middle layer.
  colorTop = color(200); // Initial lighter shade of gray for top layer.

  drawLineGroups(); // Draw the initial set of line groups.
}

function draw() {
  background(255); // Clear the canvas each frame.

  // show instruction text at the top left of the screen
  displayInstructions();

  let offsetX = 0;
  let offsetY = 0;

  if (operationMode == "follow") {
    // Calculate offsets to make artwork follow the mouse
    offsetX = mouseX - windowWidth / 2;
    offsetY = mouseY - windowHeight / 2;
  }

  // Draw all base layer line groups with offset
  for (let group of groups) {
    group.draw(offsetX, offsetY);
  }

  // Draw the middle and top layers with offsets.
  drawMiddleLayer(offsetX, offsetY);
  drawTopLayer(offsetX, offsetY);

  // Draw and update moving prototypes if mode is 'animate'
  if (operationMode === "animate") {
    for (let circle of movingCircles) {
      circle.update();
      circle.draw();
    }
  }
}

function drawLineGroups() {
  // Clear existing groups when resizing
  groups = [];

  let baseLayer1StartX = 0.15 * windowWidth;
  let baseLayer1StartY = 0.75 * windowHeight;
  let baseLayer1EndX = 0.544 * windowWidth;
  let baseLayer1EndY = 0.4 * windowHeight;
  let baseLayer1Angle = PI / 6.78;

  let baseLayer2StartX = 0.582 * windowWidth;
  let baseLayer2StartY = 0.325 * windowHeight;
  let baseLayer2EndX = 0.72 * windowWidth;
  let baseLayer2EndY = 0.203 * windowHeight;
  let baseLayer2Angle = PI / 6.78;

  let baseLayer3StartX = 0.2314 * windowWidth;
  let baseLayer3StartY = 0.814 * windowHeight;
  let baseLayer3EndX = 0.83 * windowWidth;
  let baseLayer3EndY = 0.285 * windowHeight;
  let baseLayer3Angle = PI / 6.78;

   // Set a random color for the base layer.
  let colorBase = color(random(98, 126), 98, 126);

  // Add new line groups to the groups array with specified properties.
  groups.push(new lineGroup(baseLayer1StartX, baseLayer1StartY, baseLayer1EndX, baseLayer1EndY, baseLayer1Angle, 3, colorBase, 10, 3));
  groups.push(new lineGroup(baseLayer2StartX, baseLayer2StartY, baseLayer2EndX, baseLayer2EndY, baseLayer2Angle, 3, colorBase, 10, 3));
  groups.push(new lineGroup(baseLayer3StartX, baseLayer3StartY, baseLayer3EndX, baseLayer3EndY, baseLayer3Angle, 10, colorBase, 5, 3));
}

function drawMiddleLayer(offsetX = 0, offsetY = 0) {
  // Draw a rectangle as the middle layer in the specified location and size.
  let middleLayerX = 0.38 * windowWidth + offsetX;
  let middleLayerY = 0.061 * windowHeight + offsetY;
  let middleLayerWidth = 0.211 * windowWidth;
  let middleLayerHeight = 0.885 * windowHeight;


  // to set up the user input mode as change the shade of the image
  if (operationMode === "shadeChange") {
    // Map mouseX and mouseY to grayscale values
    let grayscale = map(mouseX, 0, width, 0, 255); // Map to grayscale for black to white shades
    colorMiddle = color(grayscale); // Set middle layer to the mapped grayscale value
    colorTop = color(255 - grayscale); // Set top layer to an inverse grayscale for contrast
  }

  noStroke();
  fill(colorMiddle);
  rect(middleLayerX, middleLayerY, middleLayerWidth, middleLayerHeight);
}


function drawTopLayer(offsetX = 0, offsetY = 0) {

  // Draw a triangle as part of the top layer.
  fill(colorTop); 
  triangle(
    0.398 * windowWidth + offsetX, 0.505 * windowHeight + offsetY,
    0.166 * windowWidth + offsetX, 0.711 * windowHeight + offsetY,
    0.398 * windowWidth + offsetX, 0.919 * windowHeight + offsetY
  );

   // Draw first quadrilateral as part of the top layer.
  quad(
    0.558 * windowWidth + offsetX, 0.308 * windowHeight + offsetY,
    0.585 * windowWidth + offsetX, 0.283 * windowHeight + offsetY,
    0.636 * windowWidth + offsetX, 0.357 * windowHeight + offsetY,
    0.558 * windowWidth + offsetX, 0.425 * windowHeight + offsetY
  );

  quad(
    0.558 * windowWidth + offsetX, 0.5 * windowHeight + offsetY,
    0.558 * windowWidth + offsetX, 0.643 * windowHeight + offsetY,
    0.725 * windowWidth + offsetX, 0.494 * windowHeight + offsetY,
    0.666 * windowWidth + offsetX, 0.403 * windowHeight + offsetY
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawLineGroups();
}

function mousePressed() {
  // Reset everything to the original artwork
  operationMode = ""; // Reset mode
  colorMiddle = color(random(145, 188), 145, 188); // Original color for middle
  colorTop = color(random(188, 255), 188, 255); // Original color for top
  drawLineGroups(); // Redraw the line groups
  movingCircles = []; // Clear prototypes array
}

function keyPressed() {
  if (key == "1") {
    operationMode = "follow"; 
  } else if (key == "2") {
    colorMiddle = color(random(145, 188), random(145, 188), random(145, 188));
    colorTop = color(random(188, 255), random(188, 255), random(188, 255));
  } else if (key == "3") {
    operationMode = "animate";
    movingCircles = [];

    // Create 10 circles, each moving in the opposite direction of the lineGroup angle
    for (let group of groups) {
      for (let i = 0; i < 10; i++) {
        let startX = group.startX;
        let startY = group.startY;
        let oppositeAngle = group.angle + PI; // Reverse the angle
        movingCircles.push(new MovingCircle(startX, startY, oppositeAngle));
      }
    }
  } else if (key == "4") {
    operationMode = "shadeChange"; // Set mode for shade-changing rectangle
  }
}

// Function to show instruction text on the canvas
function displayInstructions() {
  fill(0); // Set text color to black
  textSize(16); // Set text size
  textAlign(LEFT); // Align text to the left
  text(
    '1. Press "1" on keyboard to make the artwork follow your mouse\n' +
    '2. Press "2" on keyboard to change the color of the artwork\n' +
    '3. Press "3" on keyboard to see circle animation\n' +
    '4. Press "4" on keyboard to change the shade of the artwork\n' +
    '5. Click on screen to set it back to the original artwork',
    10, 30 // Position in the top-left corner with a small margin
  );
}
