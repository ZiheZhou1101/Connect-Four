import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import Gameboard from './components/Gameboard';
import { checkWinner } from './helpers/checkWinner';
import { checkRow } from "./helpers/checkRow";
import { MAX_COL } from "./constants";

const GameWrapper = styled.div`
width:100vw;
height: 100vh;
background-color: black;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
`
const GameInfo = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`
const UserMark = styled.div`
width:0px;
height:0px;
border: 25px solid goldenrod;
border-radius: 50%;
`
const ComputerMark = styled.div`
width:0px;
height:0px;
border: 25px solid silver;
border-radius: 50%;
`
const ColorIndicator = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
const Marker = styled.span`
display:flex;
justify-content: center;
align-items: center;
padding-left: 20px;
`
const RestartButton = styled.button`
margin:10px;
border-radius: 10px;
width: 100px;
height: 40px;
border: 1px solid;
:hover {
  cursor: pointer;
}
`
const Game = () => {
  const [checkWinnerRow, setCheckWinnerRow] = useState(0);
  const [checkWinnerCol, setCheckWinnerCol] = useState(0);
  const [gameboard, setGameboard] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState('draw');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY })
      return () => window.removeEventListener('mousemove', mouseMove)
    }
    window.addEventListener('mousemove', mouseMove)
  }, [coords])

  const updateBoard = (row, col, isPlayerTurn) => {
    const newBoard = [...gameboard];
    newBoard[row][col] = isPlayerTurn ? 1 : 2;
    setGameboard(newBoard);
    setCheckWinnerRow(row);
    setCheckWinnerCol(col);
  }

  const playerMove = (coordinates) => {
    let [row, col] = coordinates;
    if (isPlayerTurn && gameboard[row][col] === 0) {
      row = checkRow(gameboard, col)
      updateBoard(row, col, isPlayerTurn);
      setIsPlayerTurn(!isPlayerTurn);
    }
  }

  const computerMove = () => {
    const remainingCoords = [];
    for (let col = 0; col < MAX_COL; col++) {
      if (gameboard[0][col] === 0) {
        remainingCoords.push([0, col])
      }
    }
    const max = remainingCoords.length;
    const min = 0;
    const moveIndex = Math.floor(Math.random() * (max - min) + min);
    const move = remainingCoords[moveIndex];
    let computerRow = move[0];
    const computerCol = move[1];
    computerRow = checkRow(gameboard, computerCol);
    return [computerRow, computerCol];
  }

  const restartGame = () => {
    setIsGameOver(false);
    setWinner('draw');
    setIsPlayerTurn(true);
    setGameboard([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ])
  }

  useEffect(() => {
    const winner = checkWinner(gameboard, isPlayerTurn, checkWinnerRow, checkWinnerCol);
    if (winner !== null) {
      setIsGameOver(true);
      setWinner(winner);
      return;
    } else {
      if (!isPlayerTurn) {
        setTimeout(() => {
          const [row, col] = computerMove();
          updateBoard(row, col, isPlayerTurn);
          setIsPlayerTurn(!isPlayerTurn);
        }, 1000)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlayerTurn]);

  return (
    <GameWrapper>
      <GameInfo>
        <div>
          {isPlayerTurn ? (<UserMark style={{ position: "absolute", left: coords.x - 22, top: coords.y + 5 }} />) : <div />}
        </div>
        <h2>Connect Four</h2>
        <ColorIndicator>
          <Marker><UserMark />User </Marker>
          <Marker><ComputerMark />Computer</Marker>
        </ColorIndicator>
        <div>
          {isGameOver ? (winner === 'draw' ? (<h3>No more moves! Draw!</h3>)
            : (<h3>Game is over! Winner is: {winner}</h3>)) : (<h3>
              Turn: {isPlayerTurn ? 'User' : 'Computer'}</h3>)}
        </div>
      </GameInfo>
      <Gameboard
        gameboard={gameboard}
        isGameOver={isGameOver}
        cellClick={playerMove} />
      {isGameOver && (<RestartButton
        onClick={restartGame}>Restart</RestartButton>)}
    </GameWrapper>
  );
}
export default Game;