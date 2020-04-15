import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/database';
import "firebase/auth";
import config from './Components/firebaseconfig';
import Navbar from './Components/Navbar';
import Home from './contents/Home';
import SignIn from './contents/SignIn';
import UserNeeds from './contents/UserNeeds';
import Search from './contents/Search';
import Offers from './contents/Offers';
import SignUp from './contents/SignUp';
import AddNeed from './contents/AddNeed';
firebase.initializeApp(config);
const rdb=firebase.database();

class App extends React.Component{
  constructor(props){
  super(props);
  this.state={
    login:localStorage.getItem( "loggedin" ) === "yes",
    email:localStorage.getItem("email")!==""?localStorage.getItem("email"):"",
  }

  }

  async componentDidMount(){
    this.fetch=await rdb.ref('needs/')
    this.offers=await rdb.ref('offers/');

  }


  render(){
    const notsigned= <><Route  path="/signin">
      <SignIn firebase={firebase} />
    </Route>
      <Route  path="/signup">
        <SignUp firebase={firebase}/>
      </Route></>
    const signed=<>
      <Route  path="/addneed">
        <AddNeed rdb={rdb}/>
      </Route>
      <Route  path="/userneeds">
        <UserNeeds rdb={rdb}/>
      </Route>
      <Route  path="/offers">
        <Offers rdb={rdb}/>
      </Route></>

  return (
    <Router>
    <div className="App">
    <Navbar />
    <Switch>
    <Route exact path="/">
    <Home />
    </Route>
    <Route exact path="/search">
    <Search fetch={this.fetch} rdb={rdb} email={this.state.email}/>
    </Route>
      {localStorage.getItem("loggedin")!=="yes"?notsigned:signed}
    </Switch>
    </div>
    </Router>
    );
  }
}

export default App;
