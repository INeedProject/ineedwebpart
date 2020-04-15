import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import cogoToast from 'cogo-toast';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            pass:'',
        }
    }
    signup=async event=>{
        event.preventDefault();
        const {email,pass}=this.state;
        try{
            console.log(await this.props.firebase.auth().createUserWithEmailAndPassword( email,pass ));
            cogoToast.success("Successfully signed up");
        }catch ( error ){
            cogoToast.error("Some issues have happened");
        }

    };
    render() {
        return (
            <div className="condiv">
                <header className="App-header">
                    <div className="Login">
                        <h1 className="subtopic">Sign Up</h1>
                        <h4>Hey there</h4>
                        <TextField
                            variant="standard"
                            placeholder="Email"
                            margin="normal"
                            required
                            onChange={(e) => this.setState({email: e.target.value})}
                            value={this.state.email}
                        />
                        <br/>
                        <TextField
                            variant="standard"
                            placeholder="Password"
                            margin="normal"
                            required
                            type="password"
                            onChange={(e) => this.setState({pass: e.target.value})}
                            value={this.state.pass}
                        />

                        <div className="Button">
                            <Button
                                variant="contained"
                                onClick={this.signup}
                            >
                                Sign Up
                            </Button>
            </div>
            </div>
            </header>
            </div>
            )
        }
    }



export default SignIn;
