import { Redirect } from "react-router-dom";
import React from "react";

class Signout extends React.Component{

  componentDidMount(){
    localStorage.clear();
    window.location.reload();


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
