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

    componentDidUpdate( prevProps, prevState, snapshot ){
        if(this.state.selectedcity!==prevState.selectedcity||this.state.keywords!==prevState.keywords||this.state.selectedtype!==prevState.selectedtype){
            this.searchNeedrealtime();
        }
    }
    checkInputs=(item)=>{
        const {selectedcity,selectedtype,keywords}=this.state;
        let selectedc=null;
        let keyw=null;
        let seltype=null;
        if(selectedcity!=="")
            selectedc=selectedcity.toLowerCase();
        if(keywords!=="")
            keyw=keywords.toLowerCase();
        if(selectedtype!=="")
            seltype=selectedtype.toLowerCase();
        if(selectedc===null){

        }
        if(selectedc===null){
            if(keyw===null){
                if(seltype===null){
                    cogoToast.error("Enter any information to search");
                    return false;
                }
                return item.type.toLowerCase().includes( seltype );
            }
            return item.type.toLowerCase().includes( seltype )&& item.desc.toLowerCase().includes(keyw);

        }else if(keyw===null){
            if(seltype===null){
                return item.location.toLowerCase().includes(selectedc);
            }
            return item.location.toLowerCase().includes(selectedc) && item.type.toLowerCase().includes( seltype );
        }else if(seltype===null){
            return item.location.toLowerCase().includes( selectedc ) && item.desc.toLowerCase().includes( keyw );
        }

    }

    searchNeedrealtime =  () => {
        console.log()
        let temp=[];
        let checkingInputs=this.checkInputs;
        this.props.fetch.on('value', snapshot => {
            snapshot.forEach(function(childsnaps){
                let item=childsnaps.val();
                item.key=childsnaps.key;
                if(checkingInputs(item)){
                    temp.push( item );

                }
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
