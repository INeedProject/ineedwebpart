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
        this.needs = this.props.rdb.ref('needs/');
    }
    async componentDidMount(){
        this.getUserNeeds();
    }

    getUserNeeds = () => {
        this.needs.on('value', snapshot => {
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

    onApprove = (value) => () => {

        console.log(value);
        console.log(`/${value.key}`);

        // this.needs.child(key).set({});
        const newValue = {...value, status: true};
        delete newValue.key;
        this.needs.update({
            [`/${value.key}`]: newValue,
        })
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
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.userneeds.map(((value, index) =>
                    <tr key={index}>
                        <td>{value.desc}</td>
                        <td>{value.location}</td>
                        <td>{value.type}</td>
                        <td>

                            <Button
                              disabled={value.status}
                              variant="contained"
                              onClick={this.onApprove(value)}
                            >
                                {value.status ? 'Received' : 'Approve'}
                            </Button>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            )
        }
    }

export default UserNeeds
