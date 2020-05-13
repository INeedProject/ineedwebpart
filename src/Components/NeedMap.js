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
    loading:true,
    currentMarker: null,
    }
  }

  onOfferHelp = (f) => {
    return f;
  };
  onOfferCancel = () => {
    this.setState({currentMarker: null});
  };

  onMarkerClick = (val) => {
    this.setState({currentMarker: val});
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.props.fetch);
  }

  renderMarkers = (data) => {
    return data.map((val, index) =>
      <Marker key={index} position={{
        lat: val.latitude,
        lng: val.longitude
      }} onClick={() => this.onMarkerClick(val)} />
    );
  };

  loaded = () => {
    this.setState({loading:false});
  };

  render(){
    const {currentMarker} = this.state;
    const {isLogin} = this.props;

    const markers = this.renderMarkers(this.props.fetch);

    return (
    <>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_API_KEY}
      >
        <GoogleMap
          // onCenterChanged={(e)=>console.log(e)}
          mapContainerStyle={mapStyles}
          zoom={10}
          center={currentMarker ? {lat: currentMarker.latitude, lng: currentMarker.longitude } : {lat:39.873881,lng:32.748357}}
          onLoad={this.loaded}
        >
          {this.state.loading===true?<></>:markers}
        </GoogleMap>
      </LoadScript>
      {!!currentMarker &&
        <NeedPanel
          isLogin={isLogin}
          value={currentMarker}
          onOfferHelp={this.onOffer}
          onCancel={this.onOfferCancel}
          onSignin={this.onSignin}
        />}
    </>
  );
  }

}


export default NeedMap;
