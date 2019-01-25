import React, { Component, Fragment } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'

import ProtectedRoute from './components/common/protected-route'

import Nav from './components/common/nav'
import Auth from './routes/auth'
import Profile from './routes/profile'
import News from './routes/news'


class App extends Component {

  render() {
    return (
      <Fragment>

        <Nav/>

        <Switch>
          <ProtectedRoute path="/profile" component={Profile} />
          <Route path="/signin" component={Auth} />
          <Route path="/" component={News} />
        </Switch>

      </Fragment>
    )
  }
}

export default App