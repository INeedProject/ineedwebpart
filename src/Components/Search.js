import React from "react";
import type from './NeedTypes';
import citiesofturkey from './citiesofturkey'
import Results from './searchResults'
class Search extends React.Component{
  constructor(props){
    super(props);
    this.state={
      keywords:"",
      selectedtype:"",
      selectedcity:"",
      searched:false,
      getsearch:[],
    }

  }
  componentDidUpdate( prevProps, prevState, snapshot ){
      if(this.state.selectedcity!==prevState.selectedcity){
        this.searchNeedrealtime();
      }
  }

  searchNeedrealtime =  () => {
    const {selectedcity}=this.state;
    let temp=[];
    this.props.fetch.on('value', snapshot => {
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
  }

  offerHelp=async event =>{
    event.preventDefault();
    this.props.rdb.ref('offers/').push({
      needhash:event.target.getAttribute("id"),
      offerer:"example@example.com",
      email:this.props.email,
      state:false,
    });

    console.log("offering help?");
    this.setState({searched:true});
    alert("offer help sent");
  };

  render(){
    const {keywords,selectedtype,selectedcity}=this.state
    return (
        <div>
          <input type="text" name="keywords" value={keywords} onChange={(e) => this.setState({keywords: e.target.value})} placeholder="Enter Keywords or Description"/>
          <form onSubmit={this.showResults}>
            <select value={selectedtype}
                    onChange={(e) => this.setState({selectedtype: e.target.value})}>
              {type.map((x)=><option key={x}>{x}</option>)}
            </select>
            <select value={selectedcity}
                    onChange={(e) => this.setState({selectedcity: e.target.value})}>
              {citiesofturkey.map((x)=><option key={x}>{x}</option>)}
            </select>
            <input type="submit" value="Search" />
          </form>
          {this.state.searched===true?<Results getsearch={this.state.getsearch} offerHelp={this.offerHelp}/>:<p>You can search</p>}
        </div>
    );
  }
}
export default Search;
