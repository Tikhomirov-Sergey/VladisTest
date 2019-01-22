import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, isAuthorizedSelector } from '../../ducks/auth'

class NewPersonForm extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
          {this.props.isAuthorizedSelector ? "++++++++++++++++++++" : "----------------"}

        <form onSubmit={this.props.handleSubmit}>
          <div>
            <span onClick={() => {this.props.signIn(1,2);}} >sdfsdfsdfsdfs</span>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(
    (state) => ({
        isAuthorizedSelector: isAuthorizedSelector(state)
    }),
    { signIn }
  )(NewPersonForm)