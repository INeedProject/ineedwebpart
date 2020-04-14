import React from "react";
import { Map, GoogleApiWrapper,Marker } from 'google-maps-react';
const mapStyles = {
  width: '50%',
  height: '50%',
  margin:'0 auto',
};
class NeedMap extends React.Component{
  constructor(props){
    super(props);
    this.state={
      somemarkers:[
        {latitude:39.872917, longitude:32.748170,},
        {latitude:39.87, longitude:32.768170,},
        {latitude:39.842917, longitude:32.778170,},
        {latitude:39.832917, longitude:32.788170,},
      ],
    }
  }

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
        <div>
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
})(NeedMap);
