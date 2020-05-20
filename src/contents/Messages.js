import React, {Component} from 'react';
import {TextField, Button} from "@material-ui/core";

import './styles/home.scss';

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: null,
      textFieldValue: '',
      chats: [],
    };
    this.chatsRef = props.rdb.ref('Chats/');
    this.email = localStorage.getItem("email");
  }

  componentDidMount() {
    this.chatsRef.on('value', snapshot => {
      let chats = [];
      snapshot.forEach(function (childsnaps) {

        const chat = {
          key: childsnaps.key,
          ...childsnaps.val()
        };

        if (chat.key.indexOf(this.email.replace(/\./g, '')) !== -1) {
          chats.push(chat);
        }
      }.bind(this));
      this.setState({chats: this.generateChats(chats), loading: false,}, () => console.log(this.state.chats));
    })
  }

  generateChats = (chats) => {
    const chatsCombined = {};

    chats.forEach((el) => {
      const msgWith = el.key.replace(this.email.replace(/\./g, ''), '').replace(/\:/g, '');
      delete el.key;
      chatsCombined[msgWith] = {...chatsCombined[msgWith], ...el}
    });

    let temp = [];
    for (let [key, value] of Object.entries(chatsCombined)) {
      temp.push({key, ...value});
    }
    return temp;
  };

  sendMessage = (mSender, mReceiver, mMessage) => {
    const chatID = mSender.replace(/\./g,'') + ':' + mReceiver.replace(/\./g,'');
    const timestamp = Date.now();

    this.chatsRef.child(chatID).child(timestamp).push({
      mMessage,
      mReceiver,
      mSender,
      timestamp,
    })
  };

  handleTextFieldChange = e => {
    this.setState({
      textFieldValue: e.target.value
    });
  };

  renderMessage = (message) => (
    <div className="message">{message.mMessage}</div>
  );

  renderMessages = (chat) => {

    let messages = [];
    let reciever = '';
    // delete chat.key;
    for (let [key, value] of new Map([...Object.entries(chat).sort()])) {
      if(typeof value === "object") {
        messages.push(value);
        reciever = this.email !== value.mSender ? value.mSender : value.mReceiver;
      }
    }

    return (
      <>
        <div className="title">
          {chat.key}
        </div>
        <div className="messages">
          { messages.map(this.renderMessage) }
        </div>
        <TextField
          onChange={this.handleTextFieldChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              this.sendMessage(this.email, reciever, 'test' );
            }
          }}
        />
      </>
    )
  };

  renderChats = (chats) => {
    return (
      <div className="chats">
        <div className="contacts">
          <ul>
            {chats.map(chat => <li key={chat.key} onClick={() => this.setState({current: chat})}>{chat.key}</li>)}
          </ul>
        </div>
        <div className="chat">
          {!!this.state.current && this.renderMessages(this.state.current)}
        </div>
      </div>
    )
  };

  render() {
    const {chats} = this.state;

    return (
      <div className="condiv home">
        {this.renderChats(chats)}
      </div>
    )
  }
}


