import React, { Component } from 'react';
import './FocusIndicator.css';

class FocusIndicator extends Component {
  render() {
    return (
      <div className="focus-indicator">
        <p>Board Has Focus?</p>
        <div className="focus" />
      </div>
    );
  }
}

export default FocusIndicator;
