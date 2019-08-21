import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Register } from './components/Register';
import { Account } from './components/Account';
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
            <Route path='/account' component={Account} />
            <Route exact path='/' component={Register} />            
            <Route path='/UserList' component={UserList} />
      </Layout>
    );
  }
}
