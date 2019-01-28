import React, { Component } from 'react';

export class Links extends Component {
	render () {

  let currentRoom = this.props.room;
  var handleClick = this.props.handleClick;

	// Assigns the function passed from <App /> to each respective link
	// Returns array of <li>'s with proper actions when you click them
  const links = Object.keys(currentRoom.links).map( (key, index) => {
  	let arr = [];
    let link = currentRoom.links[key];
    let item = (
      <li key={index}>
      	<a href='#'
      		 onClick={() => handleClick(link.href)}>
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
