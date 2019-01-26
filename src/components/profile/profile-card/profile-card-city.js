import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ListItemLabel from '../../common/list-item-label'

class ProfileCardCity extends Component {

    render() {
        return <ListItemLabel title='Город' textIsRequired>{this.props.city}</ListItemLabel>
    }
}

export default ProfileCardCity

ProfileCardCity.PropTypes = {
    city: PropTypes.string
}