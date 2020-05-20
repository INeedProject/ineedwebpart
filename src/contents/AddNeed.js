import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import type from "../Components/NeedTypes";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import cogoToast from "cogo-toast";
import OnlyMap from "../Components/OnlyMap";
import Geocode from "react-geocode";



class AddNeed extends React.Component{
  constructor(props){
    super(props);
    this.state={
      keywords:"",
      selectedtype:"",
      selectedcity:"",
      poslng:null,
      poslat:null,
      location:"",
    }
  }
  componentDidMount(){
    Geocode.setApiKey(process.env.REACT_APP_API_KEY);
    Geocode.setLanguage("tr");
    Geocode.setRegion("tr");
  }

  getAddress=(lat,long)=> {
    let address="";
    Geocode.fromLatLng( long, lat ).then(
        response => {
          address = response.results[ 0 ].formatted_address;
          this.setState({location:address})
        },
        error => {
          console.error( error );
        }
    );
  }

  setCoordinates=(lat,long)=>{
    this.getAddress(lat,long)
    this.setState({poslng:lat,poslat:long});
  }
  checkInputs=()=>{
    if(this.state.keywords===""){
      cogoToast.error( "Description can't be empty" );
      return false;
    }
    else if(this.state.selectedtype===""){
      cogoToast.error( "Select a need type" )
      return false;
    }
    else if(this.state.poslat===null ||this.state.poslng===null ){
      cogoToast.error( "Select an address from map" );
      return false;
    }
    else
      return true;
  }
  insertNeedrealtime=async event=>{
    event.preventDefault();
    if(this.checkInputs()){
      await this.props.rdb.ref( 'needs/' ).push( {
        location: this.state.location,
        type: this.state.selectedtype,
        status: false,
        desc: this.state.keywords,
        email: localStorage.getItem( "email" ),
        latitude: this.state.poslat,
        longitude: this.state.poslng,

      } );

      cogoToast.success( "Your need has been recorded!" );
    }
  };

  render(){
    return (
        <div className="condiv">
          <TextField
              variant="standard"
              placeholder="Description"
              margin="normal"
              required
              onChange={(e) => this.setState({keywords: e.target.value})}
              value={this.state.keywords}
          />
          <br/>
          <FormControl className="controlform">
            <InputLabel id="demo-simple-select-label">Need Type</InputLabel>
            <Select
                value={this.state.selectedtype}
                onChange={(e) => this.setState({selectedtype: e.target.value})}>
              {type.map((x)=><MenuItem key={x} value={x}>{x}</MenuItem>)}
            </Select>
          </FormControl>
          <br/>
          <OnlyMap setcoordinates={this.setCoordinates}/>
          <br/>
          <Button
              variant="contained"
              onClick={this.insertNeedrealtime}
          >
            Ask for Help!
          </Button>

        </div>
    );
  }

}

export default AddNeed;
