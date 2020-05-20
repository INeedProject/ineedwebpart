import React, {Component} from 'react';
import NavItem from './NavItem';
import './styles.scss';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'NavItemActive': ''
    }
  }

  activeitem = (x) => {
    if (this.state.NavItemActive.length > 0) {
      document.getElementById(this.state.NavItemActive).classList.remove('active');
    }
    this.setState({'NavItemActive': x}, () => {
      document.getElementById(this.state.NavItemActive).classList.add('active');
    });
  };

  render() {
    return (
      <nav>
        <div className="logo">
          <img src="/logo.png" alt=""/>
        </div>
        <ul>
          <NavItem item="Home" tolink="/" activec={this.activeitem}/>
          <NavItem item="Search" tolink="/search" activec={this.activeitem}/>
          {localStorage.getItem("loggedin") !== "yes" ?
            <>
              <NavItem item="Sign In" tolink="/signin" activec={this.activeitem} className={'signin'}/>
              <NavItem item="Sign Up" tolink="/signup" activec={this.activeitem} className={'signup'}/>
            </> :
            <>
              <NavItem item="Add Need" tolink="/addneed" activec={this.activeitem}/>
              <NavItem item="User Needs" tolink="/userneeds" activec={this.activeitem}/>
              <NavItem item="Offers" tolink="/offers" activec={this.activeitem}/>
              <NavItem item="Chats" tolink="/chats" activec={this.activeitem}/>
              {this.props.isAdmin &&
              <NavItem item="Admin" tolink="/admin" activec={this.activeitem}/>
              }
            </>
          }
          {localStorage.getItem("loggedin") === "yes" &&
          <NavItem item="Sign Out" tolink="/signout" activec={this.activeitem} className={'logout'}/>}
        </ul>
      </nav>
    )
  }
}

export default NavBar;
