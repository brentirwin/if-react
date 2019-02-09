import React, { Component } from "react";
import { Paragraph } from "./Paragraph.js";
import { Links } from "./Links.js";

export class Room extends Component {
  render() {
    let extraText = this.props.extraText;

    // Map extra text insto series of <p>
    const extra = extraText.map((p, index) => (
      <Paragraph key={index} text={p} variables={this.props.variables} />
    ));

    return (
      <div className="room">
        <h1 className="room-name">{this.props.room.name}</h1>
        <Paragraph
          text={this.props.room.description}
          variables={this.props.variables}
        />
        {extra}
        <Links
          links={this.props.softLinks}
          handleClick={this.props.softLinksClick}
          hidden={this.props.hidden}
          variables={this.props.variables}
        />
        <Links
          links={this.props.links}
          handleClick={this.props.linksClick}
          variables={this.props.variables}
        />
        <button onClick={() => this.props.resetGame()}>Reset</button>
      </div>
    );
  }
}
