import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-materialize'

import City from './profile-card-city'
import Languages from './profile-card-languages'
import Social from './profile-card-social'

class ProfileCard extends Component {

    render() {

        return (
            <Card title={this.props.email} className='profile-card'>
                <City city={this.props.city} />
                <Languages languages={this.props.languages} />
                <Social social={this.props.social} />
            </Card>
        )
    }
}

export default ProfileCard

ProfileCard.PropTypes = {
    email: PropTypes.string,
    city: PropTypes.string,
    social: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        link: PropTypes.string
    })),
    languages: PropTypes.arrayOf(PropTypes.string)
}