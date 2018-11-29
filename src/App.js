import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board'

class App extends Component {
  state = {
    isInitialized: false
  }

  initializationComplete = () => {
    this.setState({isInitialized: true})
  }

  render() {
    return (
      <div className="App">
        <Board isInitialized={this.state.isInitialized} initializationComplete={this.initializationComplete}/>
      </div>
    );
  }
}

export default App;
