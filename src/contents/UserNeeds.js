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
        this.fetch=null;
    }
    async componentDidMount(){
        this.fetch=await this.props.rdb.ref('needs/');
        this.getUserNeeds();
    }
    getUserNeeds =()=> {
        let temp=[];
        this.fetch.on('value', snapshot => {
            snapshot.forEach(function(childsnaps){
                let item=childsnaps.val();
                item.key=childsnaps.key;
                if(item.email===localStorage.getItem("email"))
                    temp.push(item);

            });
        });
        this.setState({userneeds:temp});
    };
    showResults=(event)=>{
        event.preventDefault();
        this.setState({searched:true});
        cogoToast.success("Results have found");
    }

    render() {
        return (
            <div className="condiv">
                <Button
                    variant="contained"
                    onClick={this.showResults}
                >
                    Get your posted needs
                </Button>
                <table className="container">
                    <thead>
                    <tr>
                        <th><h1>Description</h1></th>
                        <th><h1>Location</h1></th>
                        <th><h1>Type</h1></th>
                    </tr>
                    </thead>
                {this.state.searched===true?this.state.userneeds.map(((value, index) => <tbody><tr key={index}>
                <td>{value.desc}</td><td>{value.location}</td><td>{value.type}</td></tr></tbody>)):<></>}
                </table>
            </div>
            )
        }
    }

export default UserNeeds
