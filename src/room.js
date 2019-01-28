import React, { Component } from 'react';

export class Room extends Component {
  render() {

    return (
      <div>
        <h1 className="room-name">{this.props.room.name}</h1>
        <p className="flavor-text">{this.props.room.description}</p>
      </div>
    );
  }
}