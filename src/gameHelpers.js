export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([ 0, 'clear' ]));

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  // check collision on current tetromino
  for (let y = 0; y < player.tetromino.length; y += 1) {
    //
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      //1. check tetromino cell is on
      if (player.tetromino[y][x] !== 0) {
        if (
          //2. check the movement is within game areas height (y)
          // shouldn't go through floor of game area
          !stage[y + player.pos.y + moveY] ||
          //3. check movement is inside game areas width (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          //4. check the cell that we're moving to is not 'clear'
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
        ) {
          return true;
        }

        // if(player.tetromino[y][x])
      }
    }
  }
};
