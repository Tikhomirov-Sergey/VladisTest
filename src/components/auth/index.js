import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, isAuthorizedSelector, errorSelector } from '../../ducks/auth'
import { Redirect } from 'react-router-dom'
import { Row, Input, Container, Button } from 'react-materialize'

class Auth extends Component {
  
  constructor(props) {
    super(props)

    this.emailRef = React.createRef()
    this.passwordRef = React.createRef()

    this.signIn = this.signIn.bind(this)
  }

  signIn(e) {

    const email = this.emailRef.current.state.value
    const password = this.passwordRef.current.state.value

    this.props.signIn(email, password)

    e.preventDefault()
  }

  componentWillUpdate() {
    debugger
    if(this.props.error) 
      this.passwordRef.current.state.value = ""
  }

  componentDidUpdate() {debugger
    if(this.props.error) 
      this.passwordRef.current.state.value = ""
  }

  render() {

    if (this.props.isAuthorized)
      return <Redirect to="/" />

    return (

      <Container className='login-form-container'>
        <form className='login-form' onSubmit={this.signIn}>
          <Row>
            <Input type="email" label="Email" s={6} validate required ref={this.emailRef}/>
            <Input type="password" label="password" s={6} validate required ref={this.passwordRef}/>
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
    error: errorSelector(state)
  }),
  { signIn }
)(Auth)