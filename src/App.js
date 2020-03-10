import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import "firebase/auth";
import { Map, GoogleApiWrapper,Marker } from 'google-maps-react';



const config = {
  apiKey: "AIzaSyBdkoTn81MIQMGLHgExwJ5jS1KLWyn6As8",
  authDomain: "ineedcapstone.firebaseapp.com",
  databaseURL: "https://ineedcapstone.firebaseio.com",
  projectId: "ineedcapstone",
  storageBucket: "ineedcapstone.appspot.com",
  messagingSenderId: "171791021581",
  appId: "1:171791021581:web:01085a0bcdee9a79f9c744",
  measurementId: "G-STQ0VNRVBQ"
};
firebase.initializeApp(config);
//let db = firebase.firestore();
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
      cities:['Select a City','Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
        'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
        'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
        'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'istanbul', 'izmir',
        'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya',
        'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya',
        'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
        'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak',
        'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'],
      selectedcity:"",
      type:['Type Of Need','Clothing','Electronics','Books'],
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
    };

    //this.insertNeed=this.insertNeed.bind(this);
    this.insertNeedrealtime=this.insertNeedrealtime.bind(this);

  }


  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  insertNeedrealtime(event){
    event.preventDefault();
    //var citiesRef = db.collection('cities');

    rdb.ref('needs/').push({
      location: this.state.selectedcity,
      type: this.state.selectedtype,
      status:false,
      desc:this.state.keywords,
      email:this.state.email,
    });

    console.log("itworks?");
    console.log(this.state.selectedcity);
    console.log(this.state.selectedtype);
    console.log(this.state.keywords);
    this.setState({getsearch:[],searched:false});
  };
  signup=async event=>{
    event.preventDefault();
    const {email,pass}=this.state;
    try{
      console.log(await firebase.auth().createUserWithEmailAndPassword( email,pass ));
      // eslint-disable-next-line no-restricted-globals
      //history.push( "/" );
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
      // eslint-disable-next-line no-restricted-globals
      //history.push( "/" );
      console.log("you are logged in");
      this.setState({login:true})
    }catch ( error ){
      alert(error);
    }

  };


  /*insertNeed(){
    //event.preventDefault();
    var citiesRef = db.collection('cities');

    var landmarks = Promise.all([
      citiesRef.doc(this.state.selectedcity.toLowerCase()).collection('needs').doc().set({
        location: this.state.selectedcity,
        type: this.state.selectedtype,
        status:false,
        desc:this.state.keywords,

      })
    ]);
    console.log("itworks?");
    console.log(this.state.selectedcity);
    console.log(this.state.selectedtype);
    console.log(this.state.keywords);
    this.setState({getsearch:[],searched:false});
  }*/

  searchNeedrealtime = async event => {
    event.preventDefault();
    let temp=[];
    let ref =await rdb.ref('needs/');
    ref.on('value', snapshot => {
      snapshot.forEach(function(childsnaps){
        let item=childsnaps.val();
        item.key=childsnaps.key;
        temp.push(item);

      });

    });
    this.setState({getsearch:temp});
  };
  getUserNeeds = async event => {
    const {email}=this.state;
    event.preventDefault();
    let temp=[];
    console.log(this.state.email);
    let ref =await rdb.ref('needs/');
    ref.on('value', snapshot => {
      snapshot.forEach(function(childsnaps){
        let item=childsnaps.val();
        item.key=childsnaps.key;
        if(item.email===email)
          temp.push(item);

      });

    });
    this.setState({userneeds:temp});
  };
  offerHelp=async event =>{
    event.preventDefault();
    rdb.ref('offers/').push({
      needhash:event.target.getAttribute("id"),
      offerer:"example@example.com",
      email:this.state.email,
      state:false,
    });

    console.log("offering help?");
    this.setState({searched:false});
    alert("offer help sent");
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



  // searchNeed=(event)=>{
  //   event.preventDefault();
  //   if (this.state.selectedcity==="izmir"||this.state.selectedcity==="istanbul"||this.state.selectedcity==="Sakarya"||this.state.selectedcity==="Adana"||this.state.selectedcity==="Ankara"){
  //     let i = 0;
  //     event.preventDefault();
  //     let { getsearch } = this.state;
  //     let needs = db.collectionGroup( 'needs' ).where( 'location', '==', this.state.selectedcity.toLowerCase() );
  //     needs.get().then( function ( querySnapshot ){
  //       querySnapshot.forEach( function ( doc ){
  //         //console.log( doc.id, ' => ', doc.data() );
  //         getsearch[ i ] = doc.data();
  //         i++;
  //       } );
  //     } );
  //     this.setState( { getsearch,searched:true } );
  //
  //   }
  //   else{
  //     this.setState({getsearch:[],searched:false});
  //   }
  // };

  render(){
    return (
        <div className id="demo">
          <div className="sidenav">
            <input type="text" name="keywords" value={this.state.keywords} onChange={(e) => this.setState({keywords: e.target.value})} placeholder="Enter Keywords or Description"/>
            <form onSubmit={this.searchNeedrealtime}>
              <select value={this.state.selectedtype}
                      onChange={(e) => this.setState({selectedtype: e.target.value})}>
                {this.state.type.map((x)=><option key={x}>{x}</option>)}
              </select>
              <select value={this.state.selectedcity}
                      onChange={(e) => this.setState({selectedcity: e.target.value})}>
                {this.state.cities.map((x)=><option key={x}>{x}</option>)}
              </select>
              <input type="submit" value="Search" />
            </form>
            <div>
            {this.state.getsearch.map(((value, index) => <div ><p><strong>{index+1}</strong><br></br><strong>Description:</strong>{value.desc}<br></br><strong>Location:</strong>{value.location}<br></br><strong>Type:</strong>{value.type}</p>
            <input type="submit" value="OfferHelp" onClick={this.offerHelp} id={value.key}/></div>))}
            </div>
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
            {this.state.userneeds.map(((value, index) => <div ><p><strong>{index+1}</strong><br></br><strong>Description:</strong>{value.desc}<br></br>
              <strong>Location:</strong>{value.location}<br></br><strong>Type:</strong>{value.type}</p></div>))}
            {this.state.offerdata.map(((value, index) => <div ><p><strong>{index+1}</strong><br></br><strong>My Email:</strong>{value.email}<br></br>
              <strong>Offerer:</strong>{value.offerer}<br></br><strong>state:</strong>{value.state} <br></br><strong>Hashcode of the need:</strong>{value.needhash}</p></div>))}

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
  apiKey:'AIzaSyBdkoTn81MIQMGLHgExwJ5jS1KLWyn6As8',
})(App);


