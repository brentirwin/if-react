import React, { Component } from 'react';
import './App.css';
import { RoomController } from './RoomController.js';

/*
	Game.js represents an instance of the game.
	When the user gets a Game Over or restarts on their own, it is reloaded,
	resetting all of the playthrough-specific variables.
*/

export class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			variables: {}
		};
	}

	componentDidMount() {
		const rawVar = this.props.game.variables;
		let variables = {};

		// Preset variables
		let preset = rawVar.preset;
		for (var key in preset) {
			variables[preset[key].name] = preset[key].value;
		}

		// Variables with randomly selected values
		let random = rawVar.random;
		for (var key in random) {
			variables[random[key].name] =
				random[key].value[Math.floor(Math.random()*random[key].value.length)];
		}

		// Multiple variables with randomly selected values
		// Pulling from the same pool, with no repeats
		let perm = rawVar.permutation;
		for (var key in perm) {
			let values = [];
			let names = perm[key].names;
			// Add first value
			values.push(
				perm[key].values[Math.floor(Math.random()*perm[key].values.length)]);
			// Add subsequent, non-repeating values
			for (let i=1; i<names.length; i++) {
				let newValue;
				do {
				newValue =
					perm[key].values[Math.floor(Math.random()*perm[key].values.length)];
				} while (values.includes(newValue));
				values.push(newValue);
			}
			// Add them to the object
			for (let i=0; i<values.length; i++) {
				variables[perm[key].names[i]] = values[i];
			}
		}

		this.setState({
			variables: { variables }
		});
	}

  render() {
  	const game = this.props.game;
    return (
          <RoomController game={game} />
    );
  }
}
