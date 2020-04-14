import React from "react";
import type from './NeedTypes';
import citiesofturkey from './citiesofturkey'
const search=props=>{
  return(<div>
  <input type="text" name="keywords" value={this.props.keywords} onChange={(e) => this.setState({keywords: e.target.value})} placeholder="Enter Keywords or Description"/>
  <form onSubmit={this.props.searchNeedrealtime}>
    <select value={this.props.selectedtype}
            onChange={(e) => this.setState({selectedtype: e.target.value})}>
      {type.map((x)=><option key={x}>{x}</option>)}
    </select>
    <select value={this.props.selectedcity}
            onChange={(e) => this.setState({selectedcity: e.target.value})}>
      {citiesofturkey.map((x)=><option key={x}>{x}</option>)}
    </select>
    <input type="submit" value="Search" />
  </form>
      </div>
  );
};

export default search;
