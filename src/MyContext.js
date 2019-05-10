/**
 * @author {[Monty Khanna]}
 */
import React, { Component } from 'react'

const AppContext = React.createContext();

class MyContext extends Component {
  render() {
    return <AppContext.Provider>
      {this.props.children}
    </AppContext.Provider>
  }
}

export default MyContext;