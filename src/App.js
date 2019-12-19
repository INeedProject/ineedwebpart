import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';



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
firebase.initializeApp( config );
let db = firebase.firestore();
/*db.collection("needs").add({
 location:"sakarya",
 status:"met",
 type:"digital",
 }).then(function(docRef){
 console.log("document written with Id: ", docRef.id);
 }).catch(function(error){
 console.error("error adding doc: ",error);
 });*/


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
      cities:['','Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
        'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
        'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
        'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'istanbul', 'izmir',
        'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya',
        'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya',
        'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
        'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak',
        'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'],
      selectedcity:"",
      type:['Type Of Need','Clothing','Electronics','Books',]
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    var needs=db.collectionGroup('needs').where('location', '==', this.state.selectedcity.toLowerCase());
    needs.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.id, ' => ', doc.data());
      });
    });
    alert(console.log(this.state.selectedcity.toLowerCase()));
    event.preventDefault();
  }


  render(){
    return (
        <div className="App" id="demo">
          <header className="App-header">
            <form onSubmit={this.handleSubmit}>
            <select value={this.state.selectedcity}
                    onChange={(e) => this.setState({selectedcity: e.target.value})}>
              {this.state.cities.map((x,y)=><option key={x}>{x}</option>)}
            </select>
              <input type="submit" value="Submit" />
            </form>
          </header>

        </div>
    );
  }
}

export default App;
