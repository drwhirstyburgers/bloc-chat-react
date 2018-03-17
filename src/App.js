import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';

import RoomList from './components/RoomList.js';

var config = {
  apiKey: "AIzaSyDacJU5_QpTYYKzDBjHdAFn0niyAUu4F_g",
  authDomain: "bloc-chat-react-1e520.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-1e520.firebaseio.com",
  projectId: "bloc-chat-react-1e520",
  storageBucket: "bloc-chat-react-1e520.appspot.com",
  messagingSenderId: "293191309885"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <aside align="left" id="sidebar">
          <RoomList firebase={firebase} />
        </aside>
      </div>
    );
  }
}

export default App;
