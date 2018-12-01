import React, { Component } from 'react';
import './Square.css';

class Square extends Component {
  render() {
    let { type } = this.props;
    let val;
    if (type === 'empty') {
      val = <div className="square" />;
    } else if (type === 'snake') {
      val = <div className="square snake">Snake</div>;
    } else if (type === 'head') {
      val = <div className="square head">Head</div>;
    } else if (type === 'food') {
      val = <div className="square food">Food</div>;
    }
    return val;
  }
}

export default Square;
