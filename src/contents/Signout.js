import { Redirect } from "react-router-dom";
import React from "react";

class Signout extends React.Component{

  componentDidMount(){
    localStorage.clear();
    this.setRedirect();


  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
    render()
    {
      return (
          <div>
            <Redirect to='/'/>

          </div>
      );
    }
  }


export default Signout;
