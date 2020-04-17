import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import cogoToast from "cogo-toast";
class Offers extends Component {
    constructor(props){
        super(props);
        this.state={
            offerdata:[],
            searched:false,
        }
    }
    async componentDidMount(){
        this.getOffers();
    }
    getOffers =  () => {
        let temp=[];
        this.props.offers.on('value', snapshot => {
            snapshot.forEach(function(childsnaps){
                let item=childsnaps.val();
                item.key=childsnaps.key;
                if(item.email===localStorage.getItem("email"))
                    temp.push(item);

            });

        });
        this.setState({offerdata:temp});
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
                    See the offers.
                </Button>
                <table className="container">
                    <thead>
                    <tr>
                        <th><h1>My Email</h1></th>
                        <th><h1>Offerer</h1></th>
                        <th><h1>Hashcode of the need</h1></th>
                    </tr>
                    </thead>
                {this.state.searched?this.state.offerdata.map(((value, index) => <tbody><tr key={index}><td>{value.email}</td>
                    <td>{value.offerer}</td><td>{value.needhash}</td></tr></tbody>)):<></>}
                </table>
            </div>
            )
        }
    }

    export default Offers
