import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const Ball = keyframes`
0%{transform: translateY(-30px)}
100%{transform: translateY(0px)}`

const StyledMark = styled.div`
  width:0px;
  height:0px;
  border: 25px solid ${props => props.mark === 1 ? 'goldenrod' : 'silver'};
  border-radius: 50%;
  animation: ${Ball} 800ms;`

const Mark = ({ mark }) => {
  if (mark === 0) {
    return <div />
  } else { return <StyledMark mark={mark} /> }
}
Mark.propTypes = {
  mark: PropTypes.number
}
export default Mark; 