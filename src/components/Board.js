import React, { Component } from 'react';
import Square from './Square';
import Buttons from './Buttons';
import './Board.css';
import FocusIndicator from './FocusIndicator';
import PlayAgain from './PlayAgain';

const DEFAULT_STATE = {
  intervalId: null,
  isPlaying: true,
  isTurnTaken: false,
  isFood: false,
  board: [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ],
  snakeCoordinates: [[1, 0], [1, 1], [1, 2], [1, 3]],
  foodCoords: [],
  direction: 'down'
};
class Board extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
  }

  state = DEFAULT_STATE;

  focusOnBoard = () => {
    this.boardRef.current.focus();
  };

  componentDidMount() {
    let intervalId = setInterval(() => {
      this.moveSnake();
    }, 1000);
    this.setState({ intervalId });
    console.log('intervalId', intervalId);
    this.addFood();
    this.focusOnBoard();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  handleKeyPress = ({ keyCode }) => {
    if ([65, 37].includes(keyCode)) {
      this.setState({ direction: 'left' });
    } else if ([87, 38].includes(keyCode)) {
      this.setState({ direction: 'up' });
    } else if ([68, 39].includes(keyCode)) {
      this.setState({ direction: 'right' });
    } else if ([83, 40].includes(keyCode)) {
      this.setState({ direction: 'down' });
    }
  };

  handleBtnPress = e => {
    let btnName = e.target.innerText;
    if (btnName === 'Up') {
      this.setState({ direction: 'up' });
    } else if (btnName === 'Down') {
      this.setState({ direction: 'down' });
    } else if (btnName === 'Left') {
      this.setState({ direction: 'left' });
    } else if (btnName === 'Right') {
      this.setState({ direction: 'right' });
    }
  };

  resetGame = () => {
    this.setState(DEFAULT_STATE);
  };

  componentDidUpdate = () => {
    this.focusOnBoard();
  };

  addFood = () => {
    let { snakeCoordinates } = this.state;
    let newFoodCoord = [randomNum(0, 7), randomNum(0, 7)];
    while (this.isCollision(newFoodCoord, snakeCoordinates)) {
      console.log('food overlaps with snake');
      newFoodCoord = [randomNum(0, 7), randomNum(0, 7)];
    }
    this.setState(prevState => ({
      foodCoords: [...prevState.foodCoords, newFoodCoord],
      isFood: true
    }));
  };

  moveSnake = () => {
    let { snakeCoordinates, board, foodCoords } = this.state;
    let boardHeight = board.length;
    let boardWidth = board[0].length;
    let headCoordinate = [...snakeCoordinates[snakeCoordinates.length - 1]];
    //move snake, go to other side of board if at end of board
    if (
      this.state.direction === 'right' &&
      headCoordinate[1] === boardWidth - 1
    ) {
      headCoordinate[1] = 0;
    } else if (this.state.direction === 'right') {
      headCoordinate[1] += 1;
    } else if (this.state.direction === 'left' && headCoordinate[1] === 0) {
      headCoordinate[1] = boardWidth - 1;
    } else if (this.state.direction === 'left') {
      headCoordinate[1] -= 1;
    } else if (
      this.state.direction === 'down' &&
      headCoordinate[0] === boardHeight - 1
    ) {
      headCoordinate[0] = 0;
    } else if (this.state.direction === 'down') {
      headCoordinate[0] += 1;
    } else if (this.state.direction === 'up' && headCoordinate[0] === 0) {
      headCoordinate[0] = boardHeight - 1;
    } else if (this.state.direction === 'up') {
      headCoordinate[0] -= 1;
    }
    this.setState(prevState => {
      let newSnakeCoordinates = [...prevState.snakeCoordinates];
      // this conditional only works with one piece of food
      if (this.isCollision(headCoordinate, foodCoords)) {
        newSnakeCoordinates.push(headCoordinate);
        return {
          snakeCoordinates: newSnakeCoordinates,
          foodCoords: [],
          isTurnTaken: true,
          isFood: false
        };
      }
      newSnakeCoordinates.shift();
      if (this.isCollision(headCoordinate, newSnakeCoordinates)) {
        console.log('MURDER');
        return { isPlaying: false };
      }
      newSnakeCoordinates.push(headCoordinate);
      return { snakeCoordinates: newSnakeCoordinates, isTurnTaken: true };
    });
    if (!this.state.isFood) {
      this.addFood();
    }
  };

  isCollision(itemCoord, snakeBody) {
    return snakeBody.some(coor => {
      return coor[0] === itemCoord[0] && coor[1] === itemCoord[1];
    });
  }

  render() {
    if (!this.state.isPlaying) {
      return <PlayAgain resetGame={this.resetGame} />;
    }
    let uniqKeyGen = counter();
    const squares = this.state.board.map((row, rowIndex) => {
      return row.map((current, columnIndex) => {
        for (let [coorRow, coorCol] of this.state.snakeCoordinates) {
          if (coorRow === rowIndex && coorCol === columnIndex) {
            return <Square key={uniqKeyGen()} type="snake" />;
          }
        }
        for (let [coorRow, coorCol] of this.state.foodCoords) {
          if (coorRow === rowIndex && coorCol === columnIndex) {
            return <Square key={uniqKeyGen()} type="food" />;
          }
        }

        return <Square key={uniqKeyGen()} type="empty" />;
      });
    });

    return (
      <div
        className="Board"
        onKeyDown={this.handleKeyPress}
        tabIndex="0"
        ref={this.boardRef}
      >
        {squares}
        <div className="user-feedback-container">
          <FocusIndicator />
          <Buttons handleBtnPress={this.handleBtnPress} />
        </div>
      </div>
    );
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

//includes start, excludes end
function randomNum(start, end) {
  const num = Math.floor(Math.random() * end) + start;
  return num;
}
