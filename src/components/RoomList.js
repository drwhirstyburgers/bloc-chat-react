import React, { Component } from 'react';
import '.././styles/RoomList.css';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoom: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  handleChange(e) {
    this.setState({ newRoom: e.target.value });
  }

  createRoom(newRoom) {
    this.roomsRef.push({
      name: newRoom
    });
  }

  render() {
    return (
      <section className="RoomList">
        <h2>Bloc Chat</h2>
        <ul id="room-list">
          {this.state.rooms.map( room =>
          <li>{ room.name }</li>
        )}
        </ul>
        <form onSubmit={ (e) => { e.preventDefault; this.createRoom(this.state.newRoom) } } className="create-room">
          <input type="text" value={ this.state.newRoom } onChange={ this.handleChange.bind(this) } placeholder="add a room!" />
          <input type="submit" value="add" />
        </form>
      </section>
    );
  }
}

export default RoomList;
