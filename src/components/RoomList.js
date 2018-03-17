import React, { Component } from 'react';
import '.././styles/RoomList.css';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      console.log(snapshot);
  });
  }

  render() {
    return (
      <section className="RoomList">
        <h2>Bloc Chat</h2>
        <ul id="room-list">
          <li>Room 1</li>
          <li>Room 2</li>
          <li>Room 3</li>
        </ul>
      </section>
    );
  }
}

export default RoomList;
