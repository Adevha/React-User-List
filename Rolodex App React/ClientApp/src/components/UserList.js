import React, { Component } from 'react';
import "./css/DataList.css";

export class UserList extends Component {
    displayName = UserList.name
    constructor(props) {
        super(props);
        
               
        this.state = { list: [], loading: true };

      fetch('api/UserData/GetUserData')
      .then(response => response.json())
      .then(data => {
          this.setState({ list: data, loading: false });
      });
        
    
    }



    render() {
        return (
            <div className="content">
                <div className="container">
                    <section className="section">
                        <List items={this.state.list}  />
                    </section>
                    <hr />
        
                </div>
            </div>
        );
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            filtered: this.props.items,
            user: this.state.user

        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filtered: nextProps.items
        });
    }

    handleChange(e) {
       
        let currentList = [];
      
        let newList = [];

      
        if (e.target.value !== "") {
           
            currentList = this.props.items;

            newList = currentList.filter(item => {
            
                const lcn = item.name.toLowerCase();

                const lce = item.email.toLowerCase();
             
                const filter = e.target.value.toLowerCase();
              
                if (lce.includes(filter) === true) {
                    return lce.includes(filter);
                }
                return lcn.includes(filter);
            });
        } else {
          
            newList = this.props.items;
        }
     
        this.setState({
            filtered: newList
        });
    }

    render() {
       
        return (
            <div>                
                <h1>User List</h1>
                
                <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filtered.map(item => (
                            <tr key={item.ID}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        )
    }
}
export default UserList; 