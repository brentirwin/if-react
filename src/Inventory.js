import React, { Component } from "react";

export class Inventory extends Component {
	render() {
		let inv = this.props.inventory;
		console.log(inv);
		let arr = Object.keys(inv).map((key, index) => {
			let item = inv[key];
			console.log(key, item, item.status);
			if (item.status) {
				return (
				<li key={index}>
					<button>{key}</button>
				</li>
			)} else return null;
			//if (item.status) arr.push(button);
		});
		return <ul>{arr}</ul>;
	}
}
