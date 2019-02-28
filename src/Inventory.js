import React, { Component } from "react";

export class Inventory extends Component {
	render() {
		const handleClick = this.props.handleClick;

		let inv = this.props.inventory;
		let arr = Object.keys(inv).map((key, index) => {
			let item = inv[key];
			let text = item.default;
			let destination = '';
			let gameover = false;
			let used = false;

			for (let i in item.conditions) {
				let condition = item.conditions[i];
				if (condition.room === this.props.roomKey) {
					console.log(condition);
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
				return (
				<li key={index}>
					<button
						onClick={() => handleClick(text, key, gameover, destination, used)}>
						{item.name}
					</button>
				</li>
			)} else return null;
		});
		return <ul>{arr}</ul>;
	}
}
