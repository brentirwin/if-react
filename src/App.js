import React, { Component } from 'react';
import game from './game.json';
import './App.css';
import { Room } from './Room.js';
import { Links } from './Links.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: "outside",
      extraText: []
    };

    this.followLink = this.followLink.bind(this);
    this.softLink = this.softLink.bind(this);
  }

	// Allows <Links /> to update state of <App />
	followLink(dest) {
    this.setState(state => ({
      room: dest,
      extraText: []
    }));
  }

  softLink(text) {
    this.setState({
      extraText: [...this.state.extraText, text]
    });
  }

  render() {

    let currentRoom = game["rooms"][this.state.room];

    return (
      <div className="App">
        <header className="App-header">
          <Room room={currentRoom} extraText={this.state.extraText}/>
          <Links links={currentRoom.soft_links} handleClick={this.softLink}/>
          <Links links={currentRoom.links} handleClick={this.followLink}/>
        </header>
      </div>
    );
  }
}

export default App;
