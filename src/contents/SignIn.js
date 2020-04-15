import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import cogoToast from 'cogo-toast';
import { Redirect } from 'react-router-dom'


class SignIn extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            pass:'',
        };
    }
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }
    signin=async event=>{
        event.preventDefault();
        const {email,pass}=this.state;
        try{
            console.log(await this.props.firebase.auth().signInWithEmailAndPassword( email, pass ));

            console.log("you are logged in");
            this.setState({login:true});
            localStorage.setItem("loggedin","yes");
            localStorage.setItem("email",email);
            cogoToast.success("Successfully logged in",{hideAfter:0.5,}).then(()=>{
                this.setRedirect();
                window.location.reload();
            });

        }catch ( error ){
            cogoToast.error("Check your email or password");
        }
    };
    render() {
        return (
            <div className="condiv">
                <header className="App-header">
                    <div className="Login">
                        <h1 className="subtopic">Sign In</h1>
                        <h4>Hey there</h4>
                        <form onSubmit={this.signin}>
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
                                type="submit"
                                variant="contained"
                            >
                                Log In
                            </Button>
                            {this.renderRedirect()}

            </div>
            </form>
            </div>
            </header>
            </div>
            )
        }
    }



export default SignIn;
