import React from "react";
import { GoogleMap, LoadScript,Marker } from "@react-google-maps/api";
const mapStyles = {
  width: '95%',
  height: '85%',
};
class OnlyMap extends React.Component{
  constructor( props ){
    super( props );
    this.state={
      poslng:null,
      poslat:null,
    }

  }
  placeMarker=event=>{
    this.setState({poslng:event.latLng.lng(),poslat:event.latLng.lat()});
    console.log(event.latLng.lng()+" "+event.latLng.lat());

  };

  render(){
    const {poslng,poslat}=this.state;
    return (<LoadScript
            googleMapsApiKey={process.env.REACT_APP_API_KEY}
        >
          <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={10}
              center={{lat:39.873881,lng:32.748357}}
              onClick={this.placeMarker}
          >
            <Marker visible={poslat !== null} position={{lat:poslat!=null?poslat:32,lng:poslng!==null?poslng:32}}/>
          </GoogleMap>
        </LoadScript>
    );
  }

}



export default OnlyMap;
