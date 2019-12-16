import React, { useState } from 'react';

// styled components
import { createStage } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

// custom hooks
import usePlayer from '../hooks/usePlayer';
import useStage from '../hooks/useStage';

const Tetris = () => {
  const [ dropTime, setDropTime ] = useState(null);
  const [ gameOver, setGameOver ] = useState(false);
  const [ player, updatePlayerPos, resetPlayer ] = usePlayer();
  const [ stage, setStage ] = useStage(player, resetPlayer);
  console.log('rerender');

  const movePlayer = dir => {
    updatePlayerPos({ x: dir, y: 0 });
  };

  const startGame = () => {
    // reset everything
    setStage(createStage());
    resetPlayer();
  };

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false });
  };
  //
  const dropPlayer = () => {
    drop();
  };

  // keyPress and player movement
  const move = ({ keyCode }) => {
    if (!gameOver) {
      // left keypress
      if (keyCode === 37) {
        movePlayer(-1);
        // right key press
      } else if (keyCode === 39) {
        movePlayer(1);
        // down key press
      } else if (keyCode === 40) {
        drop();
      }
    }
  };
  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}

          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
