import React from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import NeedPanel from '../Components/NeedPanel';

const mapStyles = {
  width: '100%',
  height: '100%',
}

class NeedMap extends React.Component{
  constructor(props){
    super(props);
    this.state={
    markers:this.renderMarkers(),
    loading:true,
    currentMarker: null,
    }
  }
componentDidMount(){
    this.forceUpdate();
}

  onMarkerClick = (val) => {
    this.setState({currentMarker: val});
  };

  renderMarkers = () => {
    console.log(this.props.fetch);
    const val=this.props.fetch.map((val, index) =>
       <Marker key={index} position={{
        lat: val.latitude,
        lng: val.longitude
      }} onClick={() => this.onMarkerClick(val)} />
    )
    return val;

  };
  loaded=()=>{
    this.setState({loading:false})
    this.forceUpdate();
  }

  render(){
    return (
    <>
      <LoadScript
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
      {!!this.state.currentMarker && <NeedPanel value={this.state.currentMarker}/>}
    </>
  );
  }

}


export default NeedMap;
