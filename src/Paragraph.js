import React, { Component } from "react";

export class Paragraph extends Component {
	render() {
		const text = this.props.text.slice();
		let newText = "";

		// If the description is in an array, this is because it has variables
		// Find the variables and splice them in.
		if (text.constructor === Array) {
			for (let i = 0; i < text.length; i++) {
				let item = text[i];
				if (item[0] === "$") {
					let variable = item.substring(1);
					item = this.props.variables[variable];
				}
				newText += item;
			}
		} else {
			newText = text;
		}

		const description = newText
			.split("\n")
			.map((paragraph, index) => <p key={index}>{paragraph}</p>);

		return <div className="flavor-text">{description}</div>;
	}
}
