import React, { Component } from 'react';
import '.././styles/MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      activeMessages: []
    }
    this.messagesRef = this.props.firebase.database().ref( 'messages' )
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      let message = Object.assign(snapshot.val(), {key: snapshot.key})
      this.setState({ messages: this.state.messages.concat( message ) }, () => {
        this.updateActiveMessages( this.props.activeRoom )
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.updateActiveMessages( nextProps.activeRoom );
  }

  updateActiveMessages(activeRoom) {
    if(!activeRoom) { return };
    this.setState({ activeMessages: this.state.messages.filter( message => message.roomId === activeRoom.key ) });
    console.log(this.activeMessages);
  }

  render() {
    return (
      <section className="message-list">
        <h2 id="room-name">{this.props.activeRoom ? this.props.activeRoom.name : ''}</h2>
        <ul id="message">
        {this.state.activeMessages.map( message =>
          <li key={message.key}>
            <div className="user-info">{message.username ? message.username.displayName : 'Unknown'}</div>
            <div className="message">{message.content}</div>
          </li>
        )}
        </ul>
      </section>
    );
  }
}

export default MessageList;
