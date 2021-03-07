// Block's side length
let side_length = 20;
// Distance between blocks
let block_distance = 5;
// Distance from then end of one block to the end of another
let block_to_block = side_length + block_distance;
// How much distance to move each frame
let move_distance = block_to_block;
// Fake Enum for the directions (js sucks)
const directions = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
}
// Another fake enum (js sucks), represents keycodes for various keys
const keycodes = {
    W: 87,
    D: 68,
    S: 83,
    A: 65,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    ARROW_LEFT: 37,
}
// Snake Class represents an entire snake, made up of blocks
class snake {
    // Takes a position for the head coordinates, color, and starting direction
    constructor(head_x, head_y, color, head_direction) {
        this.blocks = [new block(head_x, head_y, head_direction)];
        this.color = color;
    }
    // Calls each block's draw method
    draw_blocks() {
        for (block in this.blocks) {
            this.blocks[block].draw_block(this.color);
        }
    }
    // Adds a block to the snake
    add_block() {
        // Grabs the last block in the array, new block needs to be behind the last block
        var last_block = this.blocks.slice(-1)[0];
        // TODO: use variables and not an array
        var new_block_positions;
        // Switches over the last block's direction, sets the new block pos to behind the last block
        switch(last_block.direction) {
            case(directions.UP):
                new_block_positions = [last_block.x_position, last_block.y_position + block_to_block];
                break;
            case(directions.RIGHT):
                new_block_positions = [last_block.x_position + block_to_block, last_block.y_position];
                break;
            case(directions.DOWN):
                new_block_positions = [last_block.x_position, last_block.y_position - block_to_block];
                break;
            case(directions.LEFT):
                new_block_positions = [last_block.x_position - block_to_block, last_block.y_position];
                break;
        }
        // Adds the new block to the blocks array
        this.blocks.push(new block(new_block_positions[0], new_block_positions[1], last_block.direction));
    }
    // Moves the snake forward once
    move() {
        var new_directions = [];
        for (var index = 0; index < this.blocks.length; index++) {
            if (index != 0) {
                new_directions.push(this.blocks[index - 1].direction);
            } else {
                new_directions.push(this.blocks[index].direction);
            }
        }
        // Iterates over all blocks
        for (var index = 0; index < this.blocks.length; index++) {
            // Grabs the current block for clarity reasons
            block = this.blocks[index];
            // Holds new coordinates
            var new_x, new_y;
            // Switch over each direction to move in the correct direction
            switch(block.direction) {
                case(directions.UP):
                    new_x = block.x_position, new_y = block.y_position - move_distance;
                    break;
                case(directions.RIGHT):
                    new_x = block.x_position + move_distance, new_y = block.y_position;
                    break;
                case(directions.DOWN):
                    new_x = block.x_position, new_y = block.y_position + move_distance;
                    break;
                case(directions.LEFT):
                    new_x = block.x_position - move_distance, new_y = block.y_position;
                    break;
            }
            // Call the set_position method to update the position
            block.set_position(new_x, new_y);
            // Set new direction
            block.direction = new_directions[index];
            
        }
    }
    // Changes the direction of the snake
    change_head_direction(keycode) {
        // Grabs the head block for clarity reasons
        var head_block = this.blocks[0];
        // Sets new head direction if the correct key is pressed and the snake is able to move there
        // The snake can't turn 180 degrees instantly
        if ([keycodes.W, keycodes.ARROW_UP].includes(keycode) && head_block.direction != directions.DOWN) {
            head_block.direction = directions.UP;
        } else if ([keycodes.D, keycodes.ARROW_RIGHT].includes(keycode) && head_block.direction != directions.LEFT) {
            head_block.direction = directions.RIGHT
        } else if ([keycodes.S, keycodes.ARROW_DOWN].includes(keycode) && head_block.direction != directions.UP) {
            head_block.direction = directions.DOWN;
        } else if ([keycodes.A, keycodes.ARROW_LEFT].includes(keycode) && head_block.direction != directions.RIGHT) {
            head_block.direction = directions.LEFT;
        }
    }
}
// Block class
class block {
    // Each block has a direction and a position
    constructor (x_position, y_position, direction) {
        this.x_position = x_position;
        this.y_position = y_position;
        this.direction = direction;
    }
    // Sets a new position
    set_position (new_x, new_y) {
        // Wraps the blocks position so it doesn't go off of the screen
        if (new_x > windowWidth) {
            new_x = new_x - windowWidth;
        } else if (new_x < 0) {
            new_x = new_x + windowWidth;
        } if (new_y > windowHeight) {
            new_y = new_y - windowHeight;
        } else if (new_y < 0) {
            new_y = new_y + windowHeight;
        }
        // Sets the new position
        this.x_position = new_x;
        this.y_position = new_y;
    }
    // Draws the block
    draw_block(color) {
        fill(color);
        rect(this.x_position, this.y_position, side_length, side_length);
    }
}