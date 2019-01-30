import React, { Component } from 'react';

export class Room extends Component {
  render() {

  	let extraText = this.props.extraText;

  	// Map extra text insto series of <p>
  	const extra = extraText.map((p) =>
  		<p>{p}</p>
  	);

    return (
      <div>
        <h1 className="room-name">{this.props.room.name}</h1>
        <p className="flavor-text">{this.props.room.description}</p>
        {extra}
      </div>
    );
  }
}