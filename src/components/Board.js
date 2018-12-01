import React, { Component } from 'react';
import Square from './Square';
import './Board.css';

class Board extends Component {
  render() {
    let uniqKeyGen = counter();
    const squares = this.props.board.map((row, rowIndex) => {
      return row.map((current, columnIndex) => {
        for (let [coorRow, coorCol] of this.props.snakeCoordinates) {
          if (coorRow === rowIndex && coorCol === columnIndex) {
            return <Square key={uniqKeyGen()} type="snake" />;
          }
        }
        for (let [coorRow, coorCol] of this.props.foodCoords) {
          if (coorRow === rowIndex && coorCol === columnIndex) {
            return <Square key={uniqKeyGen()} type="food" />;
          }
        }

        return <Square key={uniqKeyGen()} type="empty" />;
      });
    });

    return <div className="Board">{squares}</div>;
  }
}

export default Board;

function counter() {
  let count = 0;
  return function inner() {
    count += 1;
    return count;
  };
}
