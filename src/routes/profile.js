import React, { Component } from 'react'
import { loadProfile, profileSelector, loadingSelector, loadedSelector } from '../ducks/profile'
import { connect } from 'react-redux'
import { Container, Col, Card } from 'react-materialize'

import Preloader from '../components/common/preloader'
import ProfileCard from '../components/profile/profile-card'

class Profile extends Component {

  componentDidMount() {
    this.props.loadProfile()
  }

  render() {

    if (this.props.loading || !this.props.profile)
      return (
        <Container className='full-page-container'>
          <Preloader />
        </Container>
      )

    if (this.props.loaded && !this.props.profile)
      return (
        <Container>
          <h4>Профиль не найден =((</h4>
        </Container>
      )
debugger
    return (
        <Container>
          <ProfileCard {...this.props.profile} />
        </Container>
    )
  }
}

export default connect(
  (state) => ({
    profile: profileSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { loadProfile }
)(Profile)