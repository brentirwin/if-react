import React, { Component } from 'react';
import rooms from './rooms.json';
import './App.css';
import { Room } from './room.js';
import { Links } from './links.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {room: "outside"};

    this.followLink = this.followLink.bind(this);
  }

  followLink(dest) {
    this.setState(state => ({
      room: dest
    }));
  }

  render() {

    let currentRoom = rooms[this.state.room];

    return (
      <div className="App">
        <header className="App-header">
          <Room room={currentRoom} />
          <Links room={currentRoom} handleClick={this.followLink}/>
        </header>
      </div>
    );
  }
}

export default App;
