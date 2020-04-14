import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import "firebase/auth";
import { Map, GoogleApiWrapper,Marker } from 'google-maps-react';
import config from './Components/firebaseconfig';
import Search from './Components/Search'
firebase.initializeApp(config);
const rdb=firebase.database();
const mapStyles = {
  width: '50%',
  height: '50%',
  margin:'0 auto',
};

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedcity:"",
      keywords:"",
      selectedtype:"",
      getsearch:[],
      searched:false,
      email:"",
      pass:"",
      login:false,
      userneeds:[],
      offerdata:[],
      somemarkers:[
        {latitude:39.872917, longitude:32.748170,},
        {latitude:39.87, longitude:32.768170,},
        {latitude:39.842917, longitude:32.778170,},
        {latitude:39.832917, longitude:32.788170,},
      ],
      loading:true,
    };
    this.fetch=null;
    this.offers=null;
    this.insertNeedrealtime=this.insertNeedrealtime.bind(this);

  }


  async componentDidMount() {
    this.fetch=await rdb.ref('needs/')
    this.offers=await rdb.ref('offers/');
    this.setState({loading:false});
    console.log(this.fetch);
    console.log((this.offers));
    console.log(firebase.auth().currentUser);
    if(firebase.auth().currentUser!=null){
      this.state.email = firebase.auth().currentUser.email;
      this.setState({login:true});
    }

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  insertNeedrealtime(event){
    event.preventDefault();
    rdb.ref('needs/').push({
      location: this.state.selectedcity,
      type: this.state.selectedtype,
      status:false,
      desc:this.state.keywords,
      email:this.state.email,
    });

    this.setState({getsearch:[],searched:false});
  };
  signup=async event=>{
    event.preventDefault();
    const {email,pass}=this.state;
    try{
      console.log(await firebase.auth().createUserWithEmailAndPassword( email,pass ));

      console.log("you are signed up");
    }catch ( error ){
      alert(error);
    }

  };
  signin=async event=>{
    event.preventDefault();
    const {email,pass}=this.state;
    try{
      console.log(await firebase.auth().signInWithEmailAndPassword( email, pass ));

      console.log("you are logged in");
      this.setState({login:true})
    }catch ( error ){
      alert(error);
    }
    console.log(firebase.auth().currentUser);
    console.log(firebase.auth().currentUser.email);

  };

  getUserNeeds = async event => {
    const {email}=this.state;
    event.preventDefault();
    let temp=[];
    console.log(this.state.email);
    this.fetch.on('value', snapshot => {
      snapshot.forEach(function(childsnaps){
        let item=childsnaps.val();
        item.key=childsnaps.key;
        if(item.email===email)
          temp.push(item);

      });
    });
    this.setState({userneeds:temp});
  };

  getOffers = async event => {
    const {email}=this.state;
    event.preventDefault();
    let temp=[];
    console.log(this.state.email);
    let ref =await rdb.ref('offers/');
    ref.on('value', snapshot => {
      snapshot.forEach(function(childsnaps){
        let item=childsnaps.val();
        item.key=childsnaps.key;
        if(item.email===email)
          temp.push(item);

      });

    });
    this.setState({offerdata:temp});
  };
  displayMarkers = () => {
    return this.state.somemarkers.map((val, index) => {
      return <Marker key={index} id={index} position={{
        lat: val.latitude,
        lng: val.longitude
      }} onClick={() => alert("You clicked to a marker! This will be need information with Modal style.")} />
    })
  };

  render(){
    return (
        <div id="demo">
          <div className="sidenav">
            <Search fetch={this.fetch} rdb={rdb} email={this.state.email}/>
            <form onSubmit={this.insertNeedrealtime}>
              <input type="submit" value="Add Need" />
            </form>
            {this.state.login!==true?<div>     <form onSubmit={this.signin}>
              <input type="text" name="keywords" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} placeholder="Enter email to sign-in or sign-up"/>
              <input type="text" name="keywords" value={this.state.pass} onChange={(e) => this.setState({pass: e.target.value})} placeholder="Enter Password to sign-in or sign-up"/>
              <input type="submit" value="Sign In" />
            </form>
              <form onSubmit={this.signup}>
                <input type="submit" value="Sign up" />
              </form></div>:<div><p>you are signed in PogChamp</p><input type="submit" value="Show my posts" onClick={this.getUserNeeds}/>
              <input type="submit" value="Show who offered help" onClick={this.getOffers}/></div>}
            {this.state.userneeds.map(((value, index) => <div ><p><strong>{index+1}</strong><br/><strong>Description:</strong>{value.desc}<br/>
              <strong>Location:</strong>{value.location}<br/><strong>Type:</strong>{value.type}</p></div>))}
            {this.state.offerdata.map(((value, index) => <div ><p><strong>{index+1}</strong><br/><strong>My Email:</strong>{value.email}<br/>
              <strong>Offerer:</strong>{value.offerer}<br/><strong>state:</strong>{value.state} <br/><strong>Hashcode of the need:</strong>{value.needhash}</p></div>))}

          </div>
          <Map
              google={this.props.google}
              zoom={8}
              style={mapStyles}
              initialCenter={{ lat: 39.873881, lng:32.748357}}
          >
            {this.displayMarkers()}
          </Map>

        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey:process.env.REACT_APP_API_KEY,
})(App);


