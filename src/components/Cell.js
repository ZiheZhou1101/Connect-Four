import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Mark from './Mark';

const Cellbox = styled.div`
width: 58px;
height: 58px;
border: 1px solid white;
display: flex;
justify-content:center;
align-items: center;
:hover {
    cursor: pointer;
}
`
const Cell = ({ mark, isGameOver, cellClick }) => {
    return (
        <Cellbox onClick={(e) => {
            !isGameOver && cellClick();
        }}>
            <Mark mark={mark} />
        </Cellbox>
    )
}
Cell.propTypes = {
    mark: PropTypes.number,
    isGameOver: PropTypes.bool,
    onClick: PropTypes.func
}
export default Cell;
