import { useState, useCallback } from 'react';
//
import { randomTetromino } from '../tetrominos';
import { TETROMINOS } from '../tetrominos';
import { STAGE_WIDTH } from '../gameHelpers';
//
export default function usePlayer() {
  // set initial tetromino to empty tetromino
  // - or tetromino renders on init render before start game is clicked
  const [ player, setPlayer ] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false
  });
  //

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided
    }));
  };

  // without useCallback causes infinite loop...
  const resetPlayer = useCallback(() => {
    setPlayer({
      // roughly in center of board
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false
    });
  }, []);

  return [ player, updatePlayerPos, resetPlayer ];
}
