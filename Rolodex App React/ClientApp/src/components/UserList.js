import React, { Component } from 'react';
import "./css/DataList.css";

export class UserList extends Component {
    displayName = UserList.name
    constructor(props) {
        super(props);
          this.state = { list: [], loading: true };

      fetch('api/SampleData/GetUserData')
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
            filtered: this.props.items
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filtered: nextProps.items
        });
    }

    handleChange(e) {
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.props.items;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lcn = item.name.toLowerCase();

                const lce = item.email.toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                if (lce.includes(filter) === true) {
                    return lce.includes(filter);
                }
                return lcn.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.props.items;
        }
        // Set the filtered state based on what our rules added to newList
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