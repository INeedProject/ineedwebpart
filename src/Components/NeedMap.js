import React from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
const mapStyles = {
  width: '95%',
  height: '85%',
};
class NeedMap extends React.Component{
  constructor(props){
    super(props);
    this.state={
    markers:[],
    loading:true,
    }
  }

  async componentDidMount(){
    console.log(this.props.getneed);
    this.displayMarkers();
    this.refresh();
  }
  refresh=()=>{
    this.setState({loading:false});
  }
  displayMarkers = () => {
    const temp=this.props.getneed.map((val, index) =>
       <Marker key={index} position={{
        lat: val.latitude,
        lng: val.longitude
      }} onClick={() => alert("You clicked to a marker! This will be need information with Modal style.")} />
    )
    console.log(temp);
    this.setState({markers:temp});
  };

  render(){
    return (<LoadScript
            googleMapsApiKey={process.env.REACT_APP_API_KEY}
        >
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={10}
            center={{lat:39.873881,lng:32.748357}}
            onClick={this.placeMarker}
        >
          {this.state.markers}
        </GoogleMap>
        </LoadScript>
    );
  }

}


export default NeedMap;
