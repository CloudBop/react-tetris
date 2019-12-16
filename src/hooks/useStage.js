import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export default function useStage(player, resetPlayer) {
  //
  const [ stage, setStage ] = useState(createStage());
  //
  useEffect(
    () => {
      // called inside useEffect so no need to pass as dep
      const updateStage = prevStage => {
        // first, flush the stage. render update stuff
        const newStage = prevStage.map(row =>
          // is cell set to clear or persist ?
          row.map(cell => (cell[1] === 'clear' ? [ 0, 'clear' ] : cell))
        );
        // draw the tetromino
        player.tetromino.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              newStage[y + player.pos.y][x + player.pos.x] = [ value, `${player.collided ? 'merged' : 'clear'}` ];
            }
          });
        });
        //
        if (player.collided) {
          resetPlayer();
        }

        return newStage;
      };
      // updater function
      setStage(prev => updateStage(prev));
    },
    // diff with primitives, no good for when the same tetromino comes after...
    // [ player.collided, player.pos.x, player.pos.y, player.tetromino ]
    [ player, resetPlayer ]
  );
  //
  return [ stage, setStage ];
}
