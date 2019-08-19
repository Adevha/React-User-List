import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Switch } from 'react-router-dom';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { UserList } from './components/UserList';

export default class App extends Component {
    displayName = App.name

    constructor(props) {
        super(props);

        this.state = {
            loggedin: true,
            userName: "test",
        };
    }
    
  render() {
    return (
      <Layout>
        
            <Route path='/register' component={Register} />
            <Switch>
                <Route path='/login' component={Login} />
                <Route exact path='/' component={Register} />
            </Switch>
            <Route path='/UserList' component={UserList} />
      </Layout>
    );
  }
}
