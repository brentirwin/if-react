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
    this.createRoom = this.createRoom.bind(this);
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

  createRoom(room, output) {
    console.log(room);
    for (let i in room) {
      if (i === "conditions" || i === "true" || i === "false") continue;
      output[i] = room[i];
    }
    if (room.hasOwnProperty("conditions")) {
      for (let i in room.conditions) {
        let condition = room.conditions[i];
        if ((condition.hasOwnProperty("true") && this.props.variables[condition.true]) ||
            (condition.hasOwnProperty("false") && !this.props.variables[condition.false]))
          this.createRoom(condition, output);
      }
    }
  }

  render() {

    const game = this.props.game;
    let currentRoom = {};
    console.log(game["rooms"].conditional);
    this.createRoom(game["rooms"][this.state.room], currentRoom);

    return (
      <div className="Room">
        <Room
          room={currentRoom}
          extraText={this.state.extraText}
          variables={this.props.variables} />
        <Links
          links={currentRoom.soft_links}
          handleClick={this.softLink}
          hidden={this.state.hiddenSoftLinks} />
        <Links
          links={currentRoom.links}
          handleClick={this.followLink} />
      </div>
    );
  }
}