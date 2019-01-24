import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, isAuthorizedSelector } from '../../ducks/auth'
import { Redirect } from 'react-router-dom'
import { Row, Input, Container, Button } from 'react-materialize'

class NewPersonForm extends Component {
  static propTypes = {}

  render() {

    if (this.props.isAuthorized)
      return <Redirect to="/" />

    return (

      <Container>
        <div className='login-form'>
          <Row l={6}>
            <Input type="email" label="Email" s={6} />
            <Input type="password" label="password" s={6} />
          </Row>
          <Button waves='light'>Войти</Button>
        </div>
      </Container>
    )
  }
}

export default connect(
  (state) => ({
    isAuthorized: isAuthorizedSelector(state)
  }),
  { signIn }
)(NewPersonForm)