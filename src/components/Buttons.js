import React, { Component } from 'react';
import './Buttons.css';

class Buttons extends Component {
  render() {
    return (
      <div className="buttons-container">
        <button
          className="btn btn-primary button"
          onClick={this.props.handleBtnPress}
        >
          Up
        </button>
        <button
          className="btn btn-primary button"
          onClick={this.props.handleBtnPress}
        >
          Down
        </button>
        <button
          className="btn btn-primary button"
          onClick={this.props.handleBtnPress}
        >
          Left
        </button>
        <button
          className="btn btn-primary button"
          onClick={this.props.handleBtnPress}
        >
          Right
        </button>
      </div>
    );
  }
}

export default Buttons;
