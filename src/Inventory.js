import React, { Component } from "react";

export class Inventory extends Component {
  render() {
    const handleClick = this.props.handleClick;

    let itemsPresent = false;
    const inv = this.props.inventory;
    let arr = Object.keys(inv).map((key, index) => {
      let item = inv[key];
      let text = item.default;
      let destination = '';
      let gameover = false;
      let used = false;

      // Use conditions
      for (let i in item.conditions) {
        const condition = item.conditions[i];

        const conditionsMet = () => {
          if (condition.room !== this.props.roomKey) return false;
          if (condition.hasOwnProperty("true"))
            for (let i in condition.true)
              if (this.props.variables[condition.true[i]] !== true)
                return false;
          if (condition.hasOwnProperty("false"))
            for (let i in condition.false)
              if (this.props.variables[condition.false[i]] !== false)
                return false;
          return true;
        }

        if (conditionsMet()) {
          text = '';
          used = condition.used;
          destination = condition.destination;
          if (destination.startsWith('gameover.')) {
            destination = destination.substring(9);
            gameover = true;
          }
          break;
        }
      }

      if (item.status) {
        itemsPresent = true;
        return (
        <li key={index} className="inv">
          <button
            onClick={() => handleClick(text, key, gameover, destination, used)}>
            {item.name}
          </button>
        </li>
      )} else return null;
    });
    if (itemsPresent) {
      return (
        <div>
        <ul>
          <li className="inv">Inventory:</li>
          {arr}
        </ul>
        </div>
      );
    } else return <ul>{arr}</ul>;
  }
}
