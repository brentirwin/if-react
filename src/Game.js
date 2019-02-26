import React, { Component } from "react";
import "./App.css";
import { RoomController } from "./RoomController.js";

/*
	Game.js represents an instance of the game.
	When the user gets a Game Over or restarts on their own, it is reloaded,
	resetting all of the playthrough-specific variables.
*/

export class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			startRoom: this.props.game.rooms.home.start,
			variables: {}
		};

		this.updateVars = this.updateVars.bind(this);
		this.initVars = this.initVars.bind(this);
		this.updateInv = this.updateInv.bind(this);
	}

	componentDidMount = () => this.initVars();

	// Creating randomized variables
	initVars() {
		const rawVar = this.props.game.variables;
		let variables = this.state.variables;

		// Preset variables
		let preset = rawVar.preset;
		for (let key in preset) {
			variables[preset[key].name] = preset[key].value;
		}

		// Variables with randomly selected values
		let random = rawVar.random;
		for (let key in random) {
			variables[random[key].name] =
				random[key].value[Math.floor(Math.random() * random[key].value.length)];
		}

		// Multiple variables with randomly selected values
		// Pulling from the same pool, with no repeats
		let perm = rawVar.permutation;
		for (let key in perm) {
			let values = [];
			let names = perm[key].names;
			// Add random, non-repeating values
			for (let i = 0; i < names.length; i++) {
				let newValue;
				do {
					newValue =
						perm[key].values[
							Math.floor(Math.random() * perm[key].values.length)
						];
				} while (values.includes(newValue));
				values.push(newValue);
			}
			// Add them to the object
			for (let i = 0; i < values.length; i++) {
				variables[perm[key].names[i]] = values[i];
			}
		}

		// Inventory
		const inv = JSON.parse(JSON.stringify(this.props.game.inventory));
		variables.inventory = inv;
		this.setState({
			variables: variables,
			inventory: inv
		});
	}

	updateInv(object) {
		let copy = JSON.parse(JSON.stringify(this.state.variables));
		for (let i in object) copy[i] = object[i];
		this.setState({ variables: copy });
	}

	updateVars(object) {

		const updateObject = (old, obj) => {
			let copy = JSON.parse(JSON.stringify(old));
			for (let i in obj) {
				if (typeof obj[i] === "object")
					copy[i] = updateObject(copy[i], obj[i]);
					else copy[i] = obj[i];
			}
			return copy;
		};

		const copy = updateObject(this.state.variables, object);
		this.setState({ variables: copy });
	}

	render() {
		const game = this.props.game;
		console.log(this.state.firstRoom);
		return (
			<RoomController
				game={game}
				variables={this.state.variables}
				updateVars={this.updateVars}
				updateInv={this.updateInv}
				resetGame={this.initVars}
				startRoom={this.state.startRoom}
			/>
		);
	}
}
