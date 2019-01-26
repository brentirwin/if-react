import React, { Component } from 'react';
import rooms from './rooms.json';
import './App.css';

let room = "outside";

// class Links extends Component {
//   render() {

//     const links = rooms[room].links.map( (link) => {
//       return (
//         <li>
//           <a href={link.href}>{link.text}</a>
//         </li>
//       );
//     });

//     return (
//       <ul>{links}</ul>
//     );
//   }
// }

class App extends Component {
  render() {
    console.log(rooms[room].links);

    const links = Object.keys(rooms[room].links).map( (key, index) => {
      let arr = [];

      let link = rooms[room].links[key];
      let item = (
        <li key={index}><a href={link.href}>{link.text}</a></li>
      );
      arr.push(item);
      return arr;
    });

    console.log(links);


    return (
      <div className="App">
        <header className="App-header">
          <h1 className="room-name">{rooms[room].name}</h1>
          <p className="flavor-text">{rooms.outside.description}</p>
          <ul>{links}</ul>
        </header>
      </div>
    );
  }
}

export default App;
