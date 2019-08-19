import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import { Link, withRouter } from "react-router-dom";
import "./css/Login.css";


export  class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
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

    onLogin = event => {
        //e.preventDefault();

        //const { username, password } = this.state;
        const { history } = this.props;

        //this.setState({ error: false });

        //if (!(username === 'george' && password === 'foreman')) {
        //    return this.setState({ error: true });
        //}

        //store.set('loggedIn', true);
        history.push('/users');
        //event.preventDefault();

       
        //const { history } = this.props;

        //this.setState({ error: false });

    
        //history.push('/');

    }

    render() {
        return (

            <div className="Login">
                <h1>Login</h1>
                <br />
                <form onSubmit={this.handleSubmit}>
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

}
