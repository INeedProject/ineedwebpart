import React from 'react';
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
    };
    this.searchNeed = this.searchNeed.bind(this);
  }


  searchNeed( event){
    let i=0;
    event.preventDefault();
    let {getsearch}= this.state;
    let needs = db.collectionGroup( 'needs' ).where( 'location', '==', this.state.selectedcity.toLowerCase() );
    needs.get().then( function ( querySnapshot ){
      querySnapshot.forEach( function ( doc ){
        console.log( doc.id, ' => ', doc.data() );
        getsearch[i]=doc.data();
        i++;
      } );
    } );
    this.setState({getsearch});
  }

  render(){
    const {getsearch}=this.state;
    return (
        <div className id="demo">
          <div className="sidenav">
            <input type="text" name="keywords" value={this.state.keywords} onChange={(e) => this.setState({keywords: e.target.value,getsearch})} placeholder="Enter Keywords to search"/>
            <form onSubmit={this.searchNeed}>
              <select value={this.state.selectedtype}
                      onChange={(e) => this.setState({selectedtype: e.target.value,getsearch})}>
                {this.state.type.map((x)=><option key={x}>{x}</option>)}
              </select>
            <select value={this.state.selectedcity}
                    onChange={(e) => this.setState({selectedcity: e.target.value,getsearch})}>
              {this.state.cities.map((x)=><option key={x}>{x}</option>)}
            </select>
              <input type="submit" value="Submit" />
            </form>
            {getsearch.map(((value, index) => <p><strong>{index}</strong><br></br><strong>Description:</strong>{value.desc}<br></br><strong>Location:</strong>{value.location}<br></br><strong>Type:</strong>{value.type}</p>))}
          </div>

        </div>
    );
  }
}

export default App;
