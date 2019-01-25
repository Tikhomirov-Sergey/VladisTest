import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, isAuthorizedSelector, errorSelector, loadingSelector } from '../ducks/auth'
import { Redirect } from 'react-router-dom'
import { Row, Input, Container, Button } from 'react-materialize'

import Preloader from '../components/common/preloader'

class Auth extends Component {

  constructor(props) {
    super(props)

    this.emailRef = React.createRef()
    this.passwordRef = React.createRef()
    this.email = 'max@test.com';

    this.signIn = this.signIn.bind(this)
  }

  signIn(e) {

    this.email = this.emailRef.current.state.value
    const password = this.passwordRef.current.state.value

    this.props.signIn(this.email, password)

    e.preventDefault()
  }

  render() {

    if (this.props.loading)
      return (
        <Container className='full-page-container'>
          <Preloader />
        </Container>
      )

    if (this.props.isAuthorized)
      return <Redirect to="/" />

    return (
      <Container className='full-page-container'>
        <form className='login-form' onSubmit={this.signIn}>
          <Row>
            <Input type="email" label="Email" s={6} validate required defaultValue={this.email} ref={this.emailRef} />
            <Input type="password" label="password" s={6} validate required ref={this.passwordRef} />
          </Row>
          <Row>
            <Button waves='light' className='col offset-s8 s4'>Войти</Button>
          </Row>
        </form>
      </Container>
    )
  }
}

export default connect(
  (state) => ({
    isAuthorized: isAuthorizedSelector(state),
    error: errorSelector(state),
    loading: loadingSelector(state)
  }),
  { signIn }
)(Auth)