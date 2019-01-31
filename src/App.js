import React, { Component } from 'react';
import game from './game.json';
import './App.css';
import { Game } from './Game.js';

/*
  App.js is the whole app.
  It is set up to run a particular game, found in game.json.
  It sends that game to Game.js, which creates an instance of the game.
*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Game game={game}/>
        </header>
      </div>
    );
  }
}

export default App;
