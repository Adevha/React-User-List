import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import "./css/Account.css";

export class Register extends Component {
    displayName = Register.name


    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            name: "",
            phone: "",
            error: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.name.length > 0 && this.state.phone.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    registerNew = event => {
        event.preventDefault();
        fetch('api/UserData/CreateUserData', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name: this.state.name, Email: this.state.email, Pass: this.state.password, Phone: this.state.phone.toString() })
        }).then(response => {
            console.log(response.status);
            if (response.status === 200) {
                this.setState({
                    error: "New User Registered!"
                });
                document.location.reload();
                window.location.replace('/account')

            }  
            else {
                this.setState({
                    error: "Error Registering User!"
                });
            }
             


            
        });
       
        

    }

    render() {
        const { error } = this.state;
        return (
            <div className="Login">
                <h1>Register</h1>
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
                    <FormGroup controlId="name" bsSize="large">
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                            value={this.state.name}
                            onChange={this.handleChange}
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup controlId="phone" bsSize="large">
                        <ControlLabel>Phone</ControlLabel>
                        <FormControl
                            value={this.state.phone}
                            onChange={this.handleChange}
                            type="number"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        onClick={this.registerNew}
                    >
                        Register
          </Button>
                </form>
            </div>
        );
    }
  
}
