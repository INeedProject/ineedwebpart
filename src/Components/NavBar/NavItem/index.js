import React, {Component} from 'react';
import {Link} from "react-router-dom";

class NavItem extends Component {
  render() {
    return (
      <li className={this.props.className} id={this.props.item} style={this.props.style}>
        <Link to={this.props.tolink} onClick={this.props.activec.bind(this, this.props.item)}>
          <span>{this.props.item}</span>
        </Link>
      </li>
    )
  }
}

export default NavItem
