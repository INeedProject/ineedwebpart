import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import cogoToast from "cogo-toast";

class UserNeeds extends Component {
    constructor(props){
        super(props);
        this.state={
            userneeds:[],
            searched:false,
        }
        this.fetch = this.props.rdb.ref('needs/');
    }
    async componentDidMount(){
        this.getUserNeeds();
    }

    getUserNeeds = () => {
        this.fetch.on('value', snapshot => {
            let temp = [];
            snapshot.forEach(function (childsnaps) {
                let item = childsnaps.val();
                item.key = childsnaps.key;
                if (item.email === localStorage.getItem("email"))
                    temp.push(item);
            });
            this.setState({userneeds: temp});
        });
    };

    render() {
        return (
            <div className="condiv">
                <table className="container">
                    <thead>
                    <tr>
                        <th><h1>Description</h1></th>
                        <th><h1>Location</h1></th>
                        <th><h1>Type</h1></th>
                    </tr>
                    </thead>
                {this.state.userneeds.map(((value, index) => <tbody><tr key={index}>
                <td>{value.desc}</td><td>{value.location}</td><td>{value.type}</td></tr></tbody>))}
                </table>
            </div>
            )
        }
    }

export default UserNeeds
