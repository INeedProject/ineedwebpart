// import React from 'react';
// import './App.css';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/database';
// import 'firebase/auth';
//
//
//
// const config = {
//   apiKey: "AIzaSyBdkoTn81MIQMGLHgExwJ5jS1KLWyn6As8",
//   authDomain: "ineedcapstone.firebaseapp.com",
//   databaseURL: "https://ineedcapstone.firebaseio.com",
//   projectId: "ineedcapstone",
//   storageBucket: "ineedcapstone.appspot.com",
//   messagingSenderId: "171791021581",
//   appId: "1:171791021581:web:01085a0bcdee9a79f9c744",
//   measurementId: "G-STQ0VNRVBQ"
// };
// firebase.initializeApp( config );
// //let db = firebase.firestore();
// let db=firebase.database();
// /*var citiesRef = db.collection('cities');
//
//  var landmarks = Promise.all([
//  citiesRef.doc('SF').collection('needs').doc().set({
//  location: 'sakarya',
//  type: 'book',
//  status:true,
//  desc:"need help with missing books in karasu's library"
//
//  })
//  ]);*/
//
//
// //var needs = db.collectionGroup('needs').where('status', '==', false);
// /*needs.get().then(function (querySnapshot) {
//  querySnapshot.forEach(function (doc) {
//  console.log(doc.id, ' => ', doc.data());
//  });
//  });*/
//
// class App extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={
//       cities:['Select a City','Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
//         'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
//         'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
//         'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'istanbul', 'izmir',
//         'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya',
//         'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya',
//         'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
//         'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak',
//         'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'],
//       selectedcity:"",
//       type:['Type Of Need','Clothing','Electronics','Books'],
//       keywords:"",
//       selectedtype:"",
//       getsearch:[],
//       searched:false,
//     };
//
//     //this.insertNeed=this.insertNeed.bind(this);
//     this.insertNeedrealtime=this.insertNeedrealtime.bind(this);
//   }
//
//
//   /*insertNeed(event){
//     event.preventDefault();
//     var citiesRef = db.collection('cities');
//
//     var landmarks = Promise.all([
//       citiesRef.doc(this.state.selectedcity.toLowerCase()).collection('needs').doc().set({
//         location: this.state.selectedcity,
//         type: this.state.selectedtype,
//         status:false,
//         desc:this.state.keywords,
//
//       })
//     ]);
//     console.log("itworks?");
//     console.log(this.state.selectedcity);
//     console.log(this.state.selectedtype);
//     console.log(this.state.keywords);
//     this.setState({getsearch:[],searched:false});
//   }*/
//   insertNeedrealtime(event){
//     event.preventDefault();
//     //var citiesRef = db.collection('cities');
//
//     db.ref('cities/'+ this.state.selectedcity.toLowerCase()+'/needs/').push({
//       location: this.state.selectedcity,
//       type: this.state.selectedtype,
//       status:false,
//       desc:this.state.keywords,
//     });
//
//     console.log("itworks?");
//     console.log(this.state.selectedcity);
//     console.log(this.state.selectedtype);
//     console.log(this.state.keywords);
//     this.setState({getsearch:[],searched:false});
//
//   }
//   componentDidMount() {
//     this.interval = setInterval(() => this.setState({ time: Date.now() }), 500);
//   }
//   componentWillUnmount() {
//     clearInterval(this.interval);
//   }
//   searchNeedrealtime=(event)=>{
//     event.preventDefault();
//     if (this.state.selectedcity==="izmir"||this.state.selectedcity==="istanbul"||this.state.selectedcity==="Sakarya"||this.state.selectedcity==="Adana"||this.state.selectedcity==="Ankara"){
//       let i = 0;
//       event.preventDefault();
//       let { getsearch } = this.state;
//       //et needs = db.collectionGroup( 'needs' ).where( 'location', '==', this.state.selectedcity.toLowerCase() );
//       let needs=db.ref('cities/'+this.state.selectedcity.toLowerCase()+'/needs/');
//       needs.
//       needs.get().then( function ( querySnapshot ){
//         querySnapshot.forEach( function ( doc ){
//           //console.log( doc.id, ' => ', doc.data() );
//           getsearch[ i ] = doc.data();
//           i++;
//         } );
//       } );
//       this.setState( { getsearch,searched:true } );
//
//     }
//     else{
//       this.setState({getsearch:[],searched:false});
//     }
//   }
//
//   // searchNeed=(event)=>{
//   //   event.preventDefault();
//   //   if (this.state.selectedcity==="izmir"||this.state.selectedcity==="istanbul"||this.state.selectedcity==="Sakarya"||this.state.selectedcity==="Adana"||this.state.selectedcity==="Ankara"){
//   //     let i = 0;
//   //     event.preventDefault();
//   //     let { getsearch } = this.state;
//   //     let needs = db.collectionGroup( 'needs' ).where( 'location', '==', this.state.selectedcity.toLowerCase() );
//   //     needs.get().then( function ( querySnapshot ){
//   //       querySnapshot.forEach( function ( doc ){
//   //         //console.log( doc.id, ' => ', doc.data() );
//   //         getsearch[ i ] = doc.data();
//   //         i++;
//   //       } );
//   //     } );
//   //     this.setState( { getsearch,searched:true } );
//   //
//   //   }
//   //   else{
//   //     this.setState({getsearch:[],searched:false});
//   //   }
//   // }
//
//   render(){
//     const {getsearch}=this.state;
//     return (
//         <div className id="demo">
//           <div className="sidenav">
//             <input type="text" name="keywords" value={this.state.keywords} onChange={(e) => this.setState({keywords: e.target.value,getsearch})} placeholder="Enter Keywords or Description"/>
//             <form onSubmit={this.searchNeed}>
//               <select value={this.state.selectedtype}
//                       onChange={(e) => this.setState({selectedtype: e.target.value,getsearch})}>
//                 {this.state.type.map((x)=><option key={x}>{x}</option>)}
//               </select>
//               <select value={this.state.selectedcity}
//                       onChange={(e) => this.setState({selectedcity: e.target.value,getsearch})}>
//                 {this.state.cities.map((x)=><option key={x}>{x}</option>)}
//               </select>
//               <input type="submit" value="Search" />
//             </form>
//             {getsearch.map(((value, index) => <p><strong>{index+1}</strong><br></br><strong>Description:</strong>{value.desc}<br></br><strong>Location:</strong>{value.location}<br></br><strong>Type:</strong>{value.type}</p>))}
//             <form onSubmit={this.insertNeedrealtime}>
//               <input type="submit" value="Add Need" />
//             </form>
//           </div>
//         </div>
//     );
//   }
// }
//
// export default App;





import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import "firebase/auth";



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
let db = firebase.firestore();
let rdb=firebase.database();
/*var citiesRef = db.collection('cities');

 var landmarks = Promise.all([
 citiesRef.doc('SF').collection('needs').doc().set({
 location: 'sakarya',
 type: 'book',
 status:true,
 desc:"need help with missing books in karasu's library"

 })
 ]);*/


//var needs = db.collectionGroup('needs').where('status', '==', false);
/*needs.get().then(function (querySnapshot) {
 querySnapshot.forEach(function (doc) {
 console.log(doc.id, ' => ', doc.data());
 });
 });*/

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
    };

    this.insertNeed=this.insertNeed.bind(this);
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

    rdb.ref('cities/'+ this.state.selectedcity.toLowerCase()+'/needs/').push({
      location: this.state.selectedcity,
      type: this.state.selectedtype,
      status:false,
      desc:this.state.keywords,
    });

    console.log("itworks?");
    console.log(this.state.selectedcity);
    console.log(this.state.selectedtype);
    console.log(this.state.keywords);
    this.setState({getsearch:[],searched:false});

  }
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


  insertNeed(){
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

  }
  searchNeedrealtime=(event)=>{
    event.preventDefault();
    if (this.state.selectedcity==="izmir"||this.state.selectedcity==="istanbul"||this.state.selectedcity==="Sakarya"||this.state.selectedcity==="Adana"||this.state.selectedcity==="Ankara"){
      let i = 0;
      event.preventDefault();
      let { getsearch } = this.state;
      //et needs = db.collectionGroup( 'needs' ).where( 'location', '==', this.state.selectedcity.toLowerCase() );
      let needs=db.ref('cities/'+this.state.selectedcity.toLowerCase()+'/needs/');
      //needs.
      needs.get().then( function ( querySnapshot ){
        querySnapshot.forEach( function ( doc ){
          //console.log( doc.id, ' => ', doc.data() );
          getsearch[ i ] = doc.data();
          i++;
        } );
      } );
      this.setState( { getsearch,searched:true } );

    }
    else{
      this.setState({getsearch:[],searched:false});
    }
  };


  searchNeed=(event)=>{
    event.preventDefault();
    if (this.state.selectedcity==="izmir"||this.state.selectedcity==="istanbul"||this.state.selectedcity==="Sakarya"||this.state.selectedcity==="Adana"||this.state.selectedcity==="Ankara"){
      let i = 0;
      event.preventDefault();
      let { getsearch } = this.state;
      let needs = db.collectionGroup( 'needs' ).where( 'location', '==', this.state.selectedcity.toLowerCase() );
      needs.get().then( function ( querySnapshot ){
        querySnapshot.forEach( function ( doc ){
          //console.log( doc.id, ' => ', doc.data() );
          getsearch[ i ] = doc.data();
          i++;
        } );
      } );
      this.setState( { getsearch,searched:true } );

    }
    else{
      this.setState({getsearch:[],searched:false});
    }
    //this.SignUp();
  };

  render(){
    const {getsearch}=this.state;
    return (
        <div className id="demo">
          <div className="sidenav">
            <input type="text" name="keywords" value={this.state.keywords} onChange={(e) => this.setState({keywords: e.target.value,getsearch})} placeholder="Enter Keywords or Description"/>
            <form onSubmit={this.searchNeed}>
              <select value={this.state.selectedtype}
                      onChange={(e) => this.setState({selectedtype: e.target.value,getsearch})}>
                {this.state.type.map((x)=><option key={x}>{x}</option>)}
              </select>
              <select value={this.state.selectedcity}
                      onChange={(e) => this.setState({selectedcity: e.target.value,getsearch})}>
                {this.state.cities.map((x)=><option key={x}>{x}</option>)}
              </select>
              <input type="submit" value="Search" />
            </form>
            {getsearch.map(((value, index) => <p><strong>{index+1}</strong><br></br><strong>Description:</strong>{value.desc}<br></br><strong>Location:</strong>{value.location}<br></br><strong>Type:</strong>{value.type}</p>))}
            <form onSubmit={this.insertNeed}>
              <input type="submit" value="Add Need" />
            </form>
            {this.state.login!==true?<div>     <form onSubmit={this.signin}>
              <input type="text" name="keywords" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} placeholder="Enter email to sign-in or sign-up"/>
              <input type="text" name="keywords" value={this.state.pass} onChange={(e) => this.setState({pass: e.target.value})} placeholder="Enter Password to sign-in or sign-up"/>
              <input type="submit" value="Sign In" />
            </form>
              <form onSubmit={this.signup}>
                <input type="submit" value="Sign up" />
              </form></div>:<p>you are signed in PogChamp</p>}


          </div>

        </div>
    );
  }
}

export default App;

