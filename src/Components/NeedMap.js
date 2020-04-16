import React from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
const mapStyles = {
  width: '95%',
  height: '85%',
}

class NeedMap extends React.Component{
  constructor(props){
    super(props);
    this.state={
    markers:this.displayMarkers(),
    loading:true,
    }
  }
componentDidMount(){
    this.forceUpdate();
}

  displayMarkers = () => {
    console.log(this.props.fetch);
    const val=this.props.fetch.map((val, index) =>
       <Marker key={index} position={{
        lat: val.latitude,
        lng: val.longitude
      }} onClick={() => alert("You clicked to a marker! This will be need information with Modal style.")} />
    )
    return val;

  };
  loaded=()=>{
    this.setState({loading:false})
    this.forceUpdate();
  }

  render(){
    return (<LoadScript
            googleMapsApiKey={process.env.REACT_APP_API_KEY}
        >
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={10}
            center={{lat:39.873881,lng:32.748357}}
            onLoad={this.loaded}
        >
          {this.state.loading===true?<></>:this.state.markers}
        </GoogleMap>
        </LoadScript>
    );
  }

}


export default NeedMap;
