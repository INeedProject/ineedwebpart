import React, { Component } from 'react'
import type from '../Components/NeedTypes';
import citiesofturkey from "../Components/citiesofturkey";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import Results from "../Components/searchResults";
import cogoToast from "cogo-toast";
class Search extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            keywords:"",
            selectedtype:"",
            selectedcity:"",
            searched:false,
            getsearch:[],
        };
        this.fetch=null
    }
    async componentDidMount(){
        this.fetch=await this.props.rdb.ref('needs/');
    }

    componentDidUpdate( prevProps, prevState, snapshot ){
        if(this.state.selectedcity!==prevState.selectedcity){
            this.searchNeedrealtime();
        }
    }

    searchNeedrealtime =  () => {
        const {selectedcity}=this.state;
        let temp=[];
        this.fetch.on('value', snapshot => {
            snapshot.forEach(function(childsnaps){
                let item=childsnaps.val();
                item.key=childsnaps.key;
                if(item.location===selectedcity)
                    temp.push(item);
            });
        });
        this.setState({getsearch:temp,searched:false});
    };
    showResults=(event)=>{
        event.preventDefault();
        this.setState({searched:true});
        cogoToast.success("Results have found");
    }

    offerHelp=async event =>{
        event.preventDefault();
        this.props.rdb.ref('offers/').push({
            needhash:event.target.getAttribute("itemID"),
            offerer:"example@example.com",
            email:this.props.email,
            state:false,
        });
        console.log("offering help?");
        this.setState({searched:true});
        cogoToast.success("Your offer to help has been sent!");
    };


    render() {
        return (
            <div className="condiv skills">
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
                    onClick={this.showResults}
                >
                    Search
                </Button>
                {this.state.searched===true?<Results getsearch={this.state.getsearch} offerHelp={this.offerHelp}/>:<p>You can search</p>}
            </div>
            )
        }
    }

    export default Search
