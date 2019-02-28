import React, { Component } from "react";

export class Links extends Component {
  render() {
    let currentLinks = this.props.links;
    var handleClick = this.props.handleClick;
    let hiddenLinks = this.props.hidden;
    let variables = this.props.variables;

    if (!currentLinks) return null;

    // Assigns the function passed from <App /> to each respective link
    // Returns array of <li>'s with proper actions when you click them
    const links = Object.keys(currentLinks).map((key, index) => {
      let arr = [];
      let link = currentLinks[key];

      // Does it change any game.state bools?
      let bools = { inventory: {} };
	  if (link.hasOwnProperty("updates")) {
		const changes = link.updates;
		if (changes.hasOwnProperty("true"))
			bools = setBools(bools, changes.true, true);
		if (changes.hasOwnProperty("false"))
			bools = setBools(bools, changes.false, false);
	  }

	  function setBools(oldObj, props, value) {
		let obj = JSON.parse(JSON.stringify(oldObj));
		for (let i in props) {
			let prop = props[i];
			if (prop.startsWith("inventory.")) {
				obj.inventory[prop.substring(10)] = {status: value};
			} else obj[prop] = value;
		}
		return obj;
	  }
	  console.log(bools);

/*      if (link.hasOwnProperty("updates")) {
        const changes = link.updates;
        if (changes.hasOwnProperty("true"))
          for (let i in changes.true) {
            bools[changes.true[i]] = true;
          }
        if (changes.hasOwnProperty("false"))
          for (let i in changes.false) {
            bools[changes.false[i]] = false;
          }
        if (changes.hasOwnProperty("toggle"))
          for (let i in changes.toggle) {
            bools[changes.toggle[i]] = !variables[changes.toggle[i]];
          }
      }
*/
      // Is it a game over?
      const gameover = link.action.startsWith("gameover.") ? true : false;
      const destination = gameover ? link.action.substring(9) : link.action;

      // Generate the button
      let item;
      if (!hiddenLinks || !hiddenLinks.includes(index)) {
        item = (
          <li key={index}>
            <button
              onClick={() => handleClick(destination, index, bools, gameover)}
            >
              {link.text}
            </button>
          </li>
        );
        arr.push(item);
      }
      return arr;
    });

    return <ul>{links}</ul>;
  }
}
