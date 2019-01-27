import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row } from 'react-materialize'

import ListItemLabel from '../../common/list-item-label'

class ProfileCardLanguages extends Component {

    render() {
        return (
            <ListItemLabel title='Знание языка' textIsRequired>
                {
                    this.props.languages && this.props.languages.map(item =>
                        <Row className='profile-card__list-item' key={item}>
                            <span>{item}</span>
                        </Row>
                    )
                }
            </ListItemLabel>
        )
    }
}

export default ProfileCardLanguages

ProfileCardLanguages.PropTypes = {
    languages: PropTypes.arrayOf(PropTypes.string)
}