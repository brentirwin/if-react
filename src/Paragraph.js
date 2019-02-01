import React, { Component } from 'react';

export class Paragraph extends Component {
	render() {
		var text = this.props.text.slice();

		// If the description is in an array, this is because it has variables
		// Find the variables and splice them in.
		if (text.constructor === Array) {
			for (let i=0; i<text.length; i++) {
				let item = text[i];
				if (text[i][0] === '$') {
					let variable = text[i].substring(1);
					text[i] = this.props.variables[variable];
				}
			}
		}
		return <p className="flavor-text">{text}</p>;
	}
}