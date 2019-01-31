import React, { Component } from 'react';
import { Room } from './Room.js';
import { Links } from './Links.js';

/*
  RoomController.js is like the view for this program.
  It resets the view without changing the state of the current game.
  It calls upon all the different things that might show up on the screen.
*/

export class RoomController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: "outside",
      extraText: [],
      hiddenSoftLinks: []
    };

    this.followLink = this.followLink.bind(this);
    this.softLink = this.softLink.bind(this);
  }

	// Allows <Links /> to update state of <App />
	followLink(dest) {
    this.setState(state => ({
      room: dest,
      extraText: [],
      hiddenSoftLinks: []
    }));
  }

  softLink(text, key) {
    this.setState({
      extraText: [...this.state.extraText, text],
      hiddenSoftLinks: [...this.state.hiddenSoftLinks, key]
    });
  }

  render() {

    const game = this.props.game;
    const currentRoom = game["rooms"][this.state.room];

    return (
      <div className="Room">
        <Room
          room={currentRoom}
          extraText={this.state.extraText}/>
        <Links
          links={currentRoom.soft_links}
          handleClick={this.softLink}
          hidden={this.state.hiddenSoftLinks} />
        <Links
          links={currentRoom.links}
          handleClick={this.followLink}/>
      </div>
    );
  }
}