import React, { Component } from 'react';
import './App.css';
import Board from './components/Board'

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
