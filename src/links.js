import React, { Component } from 'react';

export class Links extends Component {
	render () {

  let currentLinks = this.props.links;
  var handleClick = this.props.handleClick;

  if (!currentLinks) return null;

	// Assigns the function passed from <App /> to each respective link
	// Returns array of <li>'s with proper actions when you click them
  const links = Object.keys(currentLinks).map( (key, index) => {
  	let arr = [];
    let link = currentLinks[key];
    let item = (
      <li key={index}>
      	<a href='#'
      		 onClick={() => handleClick(link.action)}>
      		{link.text}
    		</a>
    	</li>
    );
    arr.push(item);
    return arr;
    });

  return (
  	<ul>{links}</ul>
	);
	}
}
