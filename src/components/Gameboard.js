import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Cell from './Cell';
import { MAX_ROW, MAX_COL } from '../constants'

const BoardWrapper = styled.div`
display: flex;
width: 420px;
flex-wrap: wrap;
`
const Gameboard = ({ gameboard, isGameOver, cellClick }) => {
    const renderBoard = () => {
        const board = [];
        for (let row = 0; row < MAX_ROW; row++) {
            for (let col = 0; col < MAX_COL; col++) {
                board.push(
                    <Cell
                        mark={gameboard[row][col]}
                        isGameOver={isGameOver}
                        cellClick={() => cellClick([row, col])} />
                )
            }
        }
        return board;
    }
    return <BoardWrapper>{renderBoard()}</BoardWrapper>;
};
Gameboard.propTypes = {
    gameboard: PropTypes.arrayOf(PropTypes.array),
    isGameOver: PropTypes.bool,
    cellClick: PropTypes.func
}
export default Gameboard;