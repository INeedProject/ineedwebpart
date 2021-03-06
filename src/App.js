import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import firebase from 'firebase/app';

import 'firebase/database';
import "firebase/auth";
import config from './Components/firebaseconfig';
import Navbar from './Components/NavBar/';
import Home from './contents/Home';
import Chats from './contents/Chats';
import Admin from './contents/Admin';
import SignIn from './contents/SignIn';
import UserNeeds from './contents/UserNeeds';
import Search from './contents/Search';
import Offers from './contents/Offers';
import SignUp from './contents/SignUp';
import AddNeed from './contents/AddNeed';
import Signout from './contents/Signout'

firebase.initializeApp(config);
const rdb = firebase.database();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: localStorage.getItem("loggedin") === "yes",
      email: localStorage.getItem("email") !== "" ? localStorage.getItem("email") : "",
    }

    this.admins = [
      'admin@admin.com',
      'faqeacc@yandex.com'
    ]
  }

  isAdmin = (email) => (this.admins.indexOf(email) !== -1);

  render() {
    const isLogin = localStorage.getItem("loggedin") === "yes";
    const isAdmin = this.isAdmin(this.state.email);
const notsigned = <><Route path="/signin">
      <SignIn firebase={firebase}/>
    </Route>
      <Route path="/signup">
        <SignUp firebase={firebase}/>
      </Route></>;

    const signed = <>
      <Route path="/addneed">
        <AddNeed rdb={rdb}/>
      </Route>
      <Route path="/userneeds">
        <UserNeeds rdb={rdb}/>
      </Route>
      <Route path="/offers">
        <Offers rdb={rdb}/>
      </Route>
      <Route path="/signout">
        <Signout/>
      </Route>
    </>;

    return (
      <Router>
        <div className="App">
          <Navbar isAdmin={isAdmin}/>
          <Switch>
            <Route exact path="/">
              <Home rdb={rdb} fetch={fetch} isLogin={isLogin}/>
            </Route>
            <Route exact path="/search">
              <Search rdb={rdb} email={this.state.email}/>
            </Route>
            <Route exact path="/chats">
              <Chats rdb={rdb}/>
            </Route>
            {isAdmin &&
            <Route exact path="/admin">
              <Admin rdb={rdb}/>
            </Route>
            }
            {isLogin ? signed : notsigned}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
