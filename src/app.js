import React, { Component, Fragment } from 'react'
import { Route, NavLink } from 'react-router-dom'

import Auth from './components/auth'

class App extends Component {

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Auth/>
      </div>
    )
  }
}

export default App