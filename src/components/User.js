import React, { Component } from 'react';
import '.././styles/User.css';

class User extends Component {
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  render() {
    return (
      <div className="sign-in-out">
        <div id="user-name">{ this.props.user ? this.props.user.displayName.split(' ')[0] : 'Guest' }</div>
        <button id="sign-in" onClick={this.signIn.bind(this)}>Sign In</button>
        <button id="sign-out" onClick={this.signOut.bind(this)}>Sign Out</button>
      </div>
    )
  }
}

export default User;
