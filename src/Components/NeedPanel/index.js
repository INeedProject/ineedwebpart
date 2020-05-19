import React from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import './style.scss'

export default class NeedPanel extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {isLogin, value: {desc, location, type}} = this.props;

    return (
      <div
        className={"need-info"}
      >
        <div className="head">
          <h2>{desc}</h2>
        </div>
        <div className="details">
          <ul>
            <li><label>Location:</label></li>
            <li><span>{location}</span></li>
            <li><label>Type:</label></li>
            <li><span>{type}</span></li>
          </ul>
          <div className="buttons">
            {isLogin ?
              <>
                <Button variant="contained" onClick={this.props.onOffer}>Offer Help</Button>

              </>
              :
              <Button className="close" variant="contained" onClick={this.props.onSignin}>Sign In</Button>
            }
            <Button variant="contained" onClick={this.props.onCancel}>Close</Button>
          </div>
        </div>
      </div>

    );
  }

}