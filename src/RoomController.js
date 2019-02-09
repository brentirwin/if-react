import React, { Component } from "react";
import { Room } from "./Room.js";

/*
  RoomController.js is like the view for this program.
  It resets the view without changing the state of the current game.
  It calls upon all the different things that might show up on the screen.
*/

export class RoomController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: "outside", // Starting room will need to come from props in future, see resetGame()
      extraText: [],
      hiddenSoftLinks: [],
      gameover: false
    };

    this.followLink = this.followLink.bind(this);
    this.softLink = this.softLink.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  // Allows <Links /> to update state of <App />
  followLink(dest, key, bools, gameover) {
    this.setState({
      room: dest,
      extraText: [],
      hiddenSoftLinks: [],
      gameover: gameover
    });
    this.props.updateVars(bools);
  }

  softLink(text, key, bools, gameover) {
    this.setState({
      extraText: [...this.state.extraText, text],
      hiddenSoftLinks: [...this.state.hiddenSoftLinks, key],
      gameover: gameover
    });
    this.props.updateVars(bools);
  }

  createRoom(room, output) {
    for (let i in room) {
      if (i === "conditions" || i === "true" || i === "false") continue;
      output[i] = room[i];
    }
    if (room.hasOwnProperty("conditions")) {
      for (let i in room.conditions) {
        let condition = room.conditions[i];
        if (
          (condition.hasOwnProperty("true") &&
            this.props.variables[condition.true]) ||
          (condition.hasOwnProperty("false") &&
            !this.props.variables[condition.false])
        )
          this.createRoom(condition, output);
      }
    }
  }

  resetGame() {
    this.setState({ room: "outside" });
    this.props.resetGame();
  }

  render() {
    const game = this.props.game;
    const roomLocation = this.state.gameover ? game.rooms.gameover : game.rooms;
    let currentRoom = {};
    this.createRoom(roomLocation[this.state.room], currentRoom);

    return (
      <Room
        room={currentRoom}
        extraText={this.state.extraText}
        variables={this.props.variables}
        softLinks={currentRoom.soft_links}
        softLinksClick={this.softLink}
        hidden={this.state.hiddenSoftLinks}
        links={currentRoom.links}
        linksClick={this.followLink}
        resetGame={this.resetGame}
      />
    );
  }
}
