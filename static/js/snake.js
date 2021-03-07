// Flags the canvas
let cnv;

/** Sleep function
  @param {int} ms number of milliseconds that the computer will sleep
  @return {Promise} promise that sets a timeout
*/
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }



  /** Centers the canvas */
function centerCanvas() {
  // Centers the canvas
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
} function windowResized() {
    centerCanvas();
}
// Creates a snake object
var my_snake = new snake(100, 100, "#ff00d8", directions.DOWN);
async function setup() {
  // Create the canvas
  cnv = createCanvas(windowWidth, windowHeight);
  // Center the Canvas
  centerCanvas();
  frameRate(10);
  // Set background to black, remove the stroke
  noStroke();
  // Adds five blocks
  for (let i = 0; i < 10; i++) {
    my_snake.add_block();
  }
   
}

function keyPressed() {
  // Calls change head direction with the keyCode
  my_snake.change_head_direction(keyCode);
}

  /** p5 draw function */
async function draw() {
  clear();
  background("black")
  // Draws the snake and moves it every frame
  my_snake.draw_blocks();
  my_snake.move();
}