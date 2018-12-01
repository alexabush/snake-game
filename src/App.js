import React, { Component } from 'react';
import Buttons from './components/Buttons';
import './App.css';
import FocusIndicator from './components/FocusIndicator';
import PlayAgain from './components/PlayAgain';
import Board from './components/Board';

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
  headCoords: [1, 3],
  snakeCoords: [[1, 0], [1, 1], [1, 2]],
  foodCoords: [],
  direction: 'down'
};
class App extends Component {
  constructor(props) {
    super(props);
    this.appRef = React.createRef();
  }

  state = DEFAULT_STATE;

  focusOnApp = () => {
    this.appRef.current.focus();
  };

  componentDidMount() {
    let intervalId = setInterval(() => {
      this.moveSnake();
    }, 1000);
    this.setState({ intervalId });
    console.log('intervalId', intervalId);
    this.addFood();
    this.focusOnApp();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  handleKeyPress = ({ keyCode }) => {
    let { direction } = this.state;
    if ([65, 37].includes(keyCode) && direction !== 'right') {
      this.setState({ direction: 'left' });
    } else if ([87, 38].includes(keyCode) && direction !== 'down') {
      this.setState({ direction: 'up' });
    } else if ([68, 39].includes(keyCode) && direction !== 'left') {
      this.setState({ direction: 'right' });
    } else if ([83, 40].includes(keyCode) && direction !== 'up') {
      this.setState({ direction: 'down' });
    }
  };

  handleBtnPress = e => {
    let { direction } = this.state;
    let btnName = e.target.innerText;
    if (btnName === 'Up' && direction !== 'down') {
      this.setState({ direction: 'up' });
    } else if (btnName === 'Down' && direction !== 'up') {
      this.setState({ direction: 'down' });
    } else if (btnName === 'Left' && direction !== 'right') {
      this.setState({ direction: 'left' });
    } else if (btnName === 'Right' && direction !== 'left') {
      this.setState({ direction: 'right' });
    }
  };

  resetGame = () => {
    this.setState(DEFAULT_STATE);
  };

  componentDidUpdate = () => {
    this.focusOnApp();
  };

  addFood = () => {
    let { headCoords, snakeCoords } = this.state;
    let newFoodCoord = [randomNum(0, 7), randomNum(0, 7)];
    while (this.isCollision(newFoodCoord, [headCoords, ...snakeCoords])) {
      console.log('REJECTED FOOD COORDINATE', newFoodCoord);
      newFoodCoord = [randomNum(0, 7), randomNum(0, 7)];
    }
    console.log('food added to board:', newFoodCoord);
    this.setState(prevState => ({
      foodCoords: [...prevState.foodCoords, newFoodCoord],
      isFood: true
    }));
  };

  moveSnake = () => {
    let { board, foodCoords, headCoords } = this.state;
    let newHeadCoords = [...headCoords];
    let boardHeight = board.length;
    let boardWidth = board[0].length;
    //move snake, go to other side of board if at end of board
    if (this.state.direction === 'right' && headCoords[1] === boardWidth - 1) {
      newHeadCoords[1] = 0;
    } else if (this.state.direction === 'right') {
      newHeadCoords[1] += 1;
    } else if (this.state.direction === 'left' && newHeadCoords[1] === 0) {
      newHeadCoords[1] = boardWidth - 1;
    } else if (this.state.direction === 'left') {
      newHeadCoords[1] -= 1;
    } else if (
      this.state.direction === 'down' &&
      newHeadCoords[0] === boardHeight - 1
    ) {
      newHeadCoords[0] = 0;
    } else if (this.state.direction === 'down') {
      newHeadCoords[0] += 1;
    } else if (this.state.direction === 'up' && newHeadCoords[0] === 0) {
      newHeadCoords[0] = boardHeight - 1;
    } else if (this.state.direction === 'up') {
      newHeadCoords[0] -= 1;
    }
    this.setState(prevState => {
      let prevHeadCoords = [...prevState.headCoords];
      let newsnakeCoords = [...prevState.snakeCoords];
      // this conditional only works with one piece of food
      if (this.isCollision(newHeadCoords, foodCoords)) {
        newsnakeCoords.push(prevHeadCoords);
        return {
          headCoords: newHeadCoords,
          snakeCoords: newsnakeCoords,
          foodCoords: [],
          isTurnTaken: true,
          isFood: false
        };
      }
      newsnakeCoords.shift();
      if (this.isCollision(newHeadCoords, newsnakeCoords)) {
        console.log('MURDER');
        return { isPlaying: false };
      }
      newsnakeCoords.push(prevHeadCoords);
      return {
        headCoords: newHeadCoords,
        snakeCoords: newsnakeCoords,
        isTurnTaken: true
      };
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
    return (
      <div
        className="App"
        onKeyDown={this.handleKeyPress}
        tabIndex="0"
        ref={this.appRef}
      >
        {this.state.isPlaying ? (
          <div>
            <Board
              headCoords={this.state.headCoords}
              board={this.state.board}
              snakeCoords={this.state.snakeCoords}
              foodCoords={this.state.foodCoords}
            />
            <div className="user-feedback-container">
              <FocusIndicator />
              <Buttons handleBtnPress={this.handleBtnPress} />
            </div>
          </div>
        ) : (
          <PlayAgain resetGame={this.resetGame} />
        )}
      </div>
    );
  }
}

export default App;

//includes start, excludes end
function randomNum(start, end) {
  const num = Math.floor(Math.random() * end) + start;
  return num;
}
