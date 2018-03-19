import React, { Component } from 'react';
import '.././styles/MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
    this.messagesRef = this.props.firebase.database().ref( 'messages ')
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      let message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.rooms.concat( message ) });
    });
  }

  render() {
    return (
      <section className="message-list">
        <h2 id="room-name">{this.props.activeRoom ? this.props.activeRoom.name : ''}</h2>
      </section>
    );
  }
}

export default MessageList;
