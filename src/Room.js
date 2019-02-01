import React, { Component } from 'react';
import { Paragraph } from './Paragraph.js';

export class Room extends Component {
  render() {

  	let extraText = this.props.extraText;

  	// Map extra text insto series of <p>
  	const extra = extraText.map((p) =>
  		<Paragraph text={p} variables={this.props.variables} />
  	);

    return (
      <div>
        <h1 className="room-name">{this.props.room.name}</h1>
        <Paragraph text={this.props.room.description} variables={this.props.variables}/>
        {extra}
      </div>
    );
  }
}