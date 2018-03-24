import React, { Component } from 'react';
import '.././styles/MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      activeMessages: [],
      newMessage:''
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
  }

  createMessage(newMessage) {
    this.messagesRef.push({
      content: newMessage,
      roomId: this.props.activeRoom.key,
      sentAt: Date.now(),
      username: this.props.user.displayName
    });
    this.setState({ newMessage: '' });
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  render() {
    return (
      <section className="message-list">
        <h2 id="room-name">{this.props.activeRoom ? this.props.activeRoom.name : ''}</h2>
        <ul id="message">
        {this.state.activeMessages.map( message =>
          <li key={message.key}>
            <div className="user-info">{message.username ? message.username : 'Guest'}</div>
            <div className="message">{message.content}</div>
          </li>
        )}
        </ul>
        <footer className="create-message">
        <form onSubmit={ (e) => { e.preventDefault(); this.createMessage(this.state.newMessage) } }>
          <input type="text" placeholder="send a message!" value={ this.state.newMessage } onChange={ this.handleChange.bind(this) } />
          <input type="submit" value="Send" />
        </form>
        </footer>
      </section>
    );
  }
}

export default MessageList;
