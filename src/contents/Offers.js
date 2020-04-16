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
                {this.state.searched?this.state.offerdata.map(((value, index) => <div key={index}><p><strong>{index+1}</strong><br/><strong>My Email:</strong>{value.email}<br/>
                    <strong>Offerer:</strong>{value.offerer}<br/><strong>state:</strong>{value.state} <br/><strong>Hashcode of the need:</strong>{value.needhash}</p></div>)):<></>}
            </div>
            )
        }
    }

    export default Offers
