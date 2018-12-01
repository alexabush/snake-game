import React, { Component } from 'react';
import './PlayAgain.css';

class PlayAgain extends Component {
  render() {
    return (
      <div className="play-again">
        <p>GAME OVER</p>
        <button className="btn" onClick={this.props.resetGame}>
          Play Again?
        </button>
      </div>
    );
  }
}

export default PlayAgain;
