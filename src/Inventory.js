import React, { Component } from "react";

export class Inventory extends Component {
	render() {
		let inv = this.props.inventory;
		console.log(inv);
		let arr = [];
		const items = Object.keys(inv).map((key, index) => {
			let item = inv[key];
			let button = (
				<li key={index}>
					<button>
						{item.name}
					</button>
				</li>
			);
			if (item.status) arr.push(button);
		});
		return <ul>{arr}</ul>
	}
}
