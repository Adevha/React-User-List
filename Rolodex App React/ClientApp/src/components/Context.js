import React, { Component } from 'react'
const StoreContext = React.createContext()
class MyComponent extends Component {
    static contextType = StoreContext
    //this line does the magic, binding this.context to the value of the Provider
    render() {
        return <div>Hello {this.context.name}</div>
    }
}
const MyApp = props => (
    <div>
        <MyComponent />
    </div>
)
class AppWithContext extends Component {
    state = { name: 'Spyna' }
    render() {
        return (
            <StoreContext.Provider value={this.state}>
                <MyApp />
            </StoreContext.Provider>
        )
    }
}
export default AppWithContext