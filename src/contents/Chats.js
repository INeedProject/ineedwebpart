import React, {Component} from 'react';
import {TextField, Button} from "@material-ui/core";

import './styles/chats.scss';

export default class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: -1,
      textFieldValue: '',
      chats: [],
    };
    this.chatsRef = props.rdb.ref('Chats/');
    this.reportsRef = props.rdb.ref('reports/');
    this.email = localStorage.getItem("email");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

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
      this.chats = this.generateChats(chats);
      this.setState({chats: this.chats, loading: false,});
    });
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
    const chatID = mSender.replace(/\./g, '') + ':' + mReceiver.replace(/\./g, '');
    const timestamp = Date.now();

    this.chatsRef.child(chatID).child(timestamp).set({
      mMessage,
      mReceiver,
      mSender,
      timestamp,
    });

    this.setState({textFieldValue: ''});
  };

  handleTextFieldChange = e => {
    this.setState({
      textFieldValue: e.target.value
    });
  };

  reportMessage = (message) => () => {
    this.reportsRef.push({
      message: message.mMessage,
      reported: message.mSender,
      reporter: this.email,
      status: false,
    });
  };

  renderMessage = (message) => (
    <div className={`message ${this.email === message.mSender ? 'sender' :''}`}>
      <span className={'text'}>{message.mMessage}</span>
      <span className={'date'}>{new Date(message.timestamp).toDateString()}</span>
      {this.email !== message.mSender &&
      <span className={'report'} onClick={this.reportMessage(message)}>Report</span>
      }
    </div>
  );

  renderMessages = (chat) => {

    let messages = [];
    let receiver = '';
    // delete chat.key;
    for (let [key, value] of new Map([...Object.entries(chat).sort()])) {
      if (typeof value === "object") {
        messages.push(value);
        receiver = this.email !== value.mSender ? value.mSender : value.mReceiver;
      }
    }

    return (
      <>
        <div className="title">
          <span>{chat.key}</span>
        </div>
        <div className="messages">
          {messages.map(this.renderMessage)}
        </div>
        <TextField
          placeholder={'Type here...'}
          onChange={this.handleTextFieldChange}
          value={this.state.textFieldValue}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              this.sendMessage(this.email, receiver, this.state.textFieldValue);
            }
          }}
        />
      </>
    )
  };

  renderChats = (chats) => {
    return (
      <>
        <div className="contacts">
          <h2 className={'title'}>People</h2>
          <ul>
            {chats.map((chat, index) =>
              <li key={chat.key} onClick={() => this.setState({current: index})}>{chat.key}</li>
            )}
          </ul>
        </div>
        <div className="chat">
          {this.state.current >= 0 && this.renderMessages(this.state.chats[this.state.current])}
        </div>
      </>
    )
  };

  render() {
    const {chats} = this.state;

return (
      <div className="condiv chats">
        {this.renderChats(chats)}
      </div>
    )
  }
}


