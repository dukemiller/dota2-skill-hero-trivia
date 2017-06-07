import React from 'react';
import './App.css';
import { Game } from './components/Game';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>DotA 2 Guessing game</h2>
          <h4>Which hero has this ability? </h4>
        </div>
        <Game />
      </div>
    );
  }
}

export default App;
