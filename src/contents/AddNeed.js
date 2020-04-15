import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import type from "../Components/NeedTypes";
import MenuItem from "@material-ui/core/MenuItem";
import citiesofturkey from "../Components/citiesofturkey";
import Button from "@material-ui/core/Button";
import cogoToast from "cogo-toast";


class AddNeed extends React.Component{
  constructor(props){
    super(props);
    this.state={
      keywords:"",
      selectedtype:"",
      selectedcity:"",

    }
  }


  insertNeedrealtime=async event=>{
    event.preventDefault();
    await this.props.rdb.ref('needs/').push({
      location: this.state.selectedcity,
      type: this.state.selectedtype,
      status:false,
      desc:this.state.keywords,
      email:localStorage.getItem("email"),
    });
    cogoToast.success("Your need has been recorded!");
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
          <FormControl className="controlform">
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
                value={this.state.selectedcity}
                onChange={(e) => this.setState({selectedcity: e.target.value})}>
              {citiesofturkey.map((x)=><MenuItem key={x} value={x}>{x}</MenuItem>)}
            </Select>
          </FormControl>
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
