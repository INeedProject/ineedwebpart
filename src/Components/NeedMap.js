import React from "react";
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api'
import NeedPanel from '../Components/NeedPanel';
import {Redirect} from 'react-router-dom';
import cogoToast from "cogo-toast";

const mapStyles = {
  width: '100%',
  height: '100%',
};

class NeedMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentMarker: null,
      redirect: false,
    }
  }

  redirect = () => {
    this.setState({redirect: true})
  };

  onSignin = () => (
    <Redirect to={'/signin'}/>
  );

  offerHelp = (f) => {
    const {currentMarker} = this.state;
this.props.rdb.ref('offers/').push({
      needhash: currentMarker.key,
      offerer: localStorage.getItem("email"),
      email: currentMarker.email,
      state: false,
    });
    cogoToast.success("Your offer to help has been sent!");
    return f;
  };

  onOfferCancel = () => {
    this.setState({currentMarker: null});
  };

  onMarkerClick = (val) => {
    this.setState({currentMarker: val});
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
}

  renderMarkers = (data) => {
    return data.map((val, index) =>
      <Marker key={index} position={{
        lat: val.latitude,
        lng: val.longitude
      }} onClick={() => this.onMarkerClick(val)}/>
    );
  };

  loaded = () => {
    this.setState({loading: false});
  };

  render() {
    const {currentMarker} = this.state;
    const {isLogin} = this.props;

    const markers = this.renderMarkers(this.props.needs);

    return (
      <>
        {this.state.redirect && this.onSignin()}
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_API_KEY}
        >
          <GoogleMap
mapContainerStyle={mapStyles}
            zoom={10}
            center={currentMarker ? {lat: currentMarker.latitude, lng: currentMarker.longitude} : {
              lat: 39.873881,
              lng: 32.748357
            }}
            onLoad={this.loaded}
          >
            {this.state.loading === true ? <></> : markers}
          </GoogleMap>
        </LoadScript>
        {!!currentMarker &&
        <NeedPanel
          isLogin={isLogin}
          value={currentMarker}
          offerHelp={this.offerHelp}
          onCancel={this.onOfferCancel}
          onSignin={this.redirect}
        />}
      </>
    );
  }

}


export default NeedMap;
