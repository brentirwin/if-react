import React, { Component } from "react";
import { Paragraph } from "./Paragraph.js";
import { Links } from "./Links.js";
import { Inventory } from "./Inventory.js";

export class Room extends Component {
  render() {
    let extraText = this.props.extraText;

    // Map extra text insto series of <p>
    const extra = extraText.map((p, index) => (
      <Paragraph key={index} text={p} variables={this.props.variables} />
    ));

    const gameover = this.props.gameover ? (
      <button onClick={() => this.props.resetGame()}>Reset</button>
    ) : (
      ""
    );

    const startGame = this.props.firstRoom ? (
      <button onClick={() => this.props.linksClick(this.props.startRoom)}>
        Start game
      </button>
    ) : (
      ""
    );

    const inventory = this.props.firstRoom ? (
      ""
    ) : (
      <Inventory inventory={this.props.variables.inventory} />
    );

    console.log(this.props.inventory);
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
        {inventory}
        {gameover}
        {startGame}
      </div>
    );
  }
}
