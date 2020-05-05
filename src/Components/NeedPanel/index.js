import React from "react";

import './style.scss'

export default class NeedPanel extends React.Component{
  constructor( props ){
    super( props );

  }

  render(){
    const {value: {desc, location}} = this.props;

    return (
        <div
            className={"need-info"}
        >
          <div className="head">
            <h2>{desc}</h2>
          </div>
          <div className="details">
            <ul>
              <li>{location}</li>
            </ul>
          </div>
        </div>

    );
  }

}