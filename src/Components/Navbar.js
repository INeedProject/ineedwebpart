import React, { Component } from 'react';
import Navitem from './Navitem';

class Navbar extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            'NavItemActive':''
        }
    }
    activeitem=(x)=>
    {
        if(this.state.NavItemActive.length>0){
            document.getElementById(this.state.NavItemActive).classList.remove('active');
        }
        this.setState({'NavItemActive':x},()=>{
            document.getElementById(this.state.NavItemActive).classList.add('active');
        });
    };
    render() {
        return (
            <nav>
            <ul>
                <Navitem item="Home" tolink="/"  activec={ this.activeitem }/>
                {localStorage.getItem("loggedin")!=="yes"?<><Navitem item="SignIn" tolink="/signin"  activec={ this.activeitem }/>
                <Navitem item="SignUp" tolink="/signup"  activec={ this.activeitem }/></>:
                <><Navitem item="Add Need" tolink="/addneed"  activec={ this.activeitem }/>
                <Navitem item="UserNeeds" tolink="/userneeds"  activec={ this.activeitem }/><Navitem item="Offers" tolink="/offers"  activec={ this.activeitem }/>
                <Navitem item="Sign Out" tolink="/signout"  activec={ this.activeitem } /></>}

            <Navitem item="Search" tolink="/search"  activec={ this.activeitem }/>
            </ul>
            </nav>
            )
        }
    }

    export default Navbar
