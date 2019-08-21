import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import { Link, withRouter } from "react-router-dom";
import "./css/Account.css";
import UserList from './UserList';



export  class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            username: '',
            submitted: false,
            loading: false,
            error: '',
            user: localStorage.getItem('user')
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    onLogout = event => {
        localStorage.setItem('user', '');

       document.location.reload();
    }

    onLogin = event => {
        //e.preventDefault();
        event.preventDefault();

        this.setState({ submitted: true });
        const { email, password, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(email && password)) {
            return;
        }

        this.setState({ loading: true });
       

       fetch('/api/UserData/Authenticate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: email, Pass: password })
        }).then(response => response.json())
            .then(data => {
                //console.log(data[0].name)
                if (data[0].status === "Success") {
                    //console.log(data[0].status);
                    this.setState({
                        error: ''
                    });
                    localStorage.setItem('user', data[0].name);
                    //console.log(localStorage.getItem('user'));
                    document.location.reload();
                }
                else {
                    //alert("Error  " + data[0].message)
                    //console.log(data[0].status);
                    this.setState({
                        error: "Error : " + data[0].message
                    });

                }
                
                //this.setState({ list: data, loading: false });
            });





    }

    render() {
        const { error } = this.state;
        const { user } = this.state;
        if (localStorage.getItem('user') == '') {
            return (

                <div className="Login">
                    <h1>Login</h1>
                    <br />

                    <form onSubmit={this.handleSubmit}>
                        <p >{error}</p>
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                            />
                        </FormGroup>
                        <Button
                            block
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                            onClick={this.onLogin}
                        >
                            Login
          </Button>
                    </form>

                </div>
            );
        }
        else {

            return (

                <div className="Login">
                    <h1>Hello {user}</h1>
                    <br />
                    <br />



                    <form >
                     
                        <Button
                            block
                            bsSize="large"

                            onClick={this.onLogout}
                        >
                            Logout
          </Button>
                        <br />
                        <br />

                    </form>
                    <UserList />
                </div>
            );

            
        }
    }

}
