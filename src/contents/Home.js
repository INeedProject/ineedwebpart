import React, { Component } from 'react';
import NeedMap from "../Components/NeedMap";


class Home extends Component {
    constructor( props ){
        super( props );
        this.state={
        }
    }
    needToArr=()=>{
        let temp=[];
        this.props.fetch.on('value', snapshot => {
            snapshot.forEach(function(childsnaps){
                let item=childsnaps.val();
                item.key=childsnaps.key;
                temp.push(item);
            });
        });
        return temp;

    }

    render() {
        return (
            <div className="condiv home">
            <NeedMap fetch={this.needToArr()}/>
            </div>
            )
        }
    }

    export default Home
