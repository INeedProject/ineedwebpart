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
        console.log(this.state.email);
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
                {this.state.searched===true?this.state.userneeds.map(((value, index) => <div ><p><strong>{index+1}</strong><br/><strong>Description:</strong>{value.desc}<br/>
                    <strong>Location:</strong>{value.location}<br/><strong>Type:</strong>{value.type}</p></div>)):<></>}
            </div>
            )
        }
    }

export default UserNeeds
