import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row } from 'react-materialize'

import ListItemLabel from '../../common/list-item-label'
import SocialHelper from '../../../code/SocialHelper'

class ProfileCardSocial extends Component {

    render() {
        return (
            <ListItemLabel title='Ссылки' textIsRequired>
                {
                    this.props.social && this.props.social.map(item =>
                        <Row className='profile-card__list-item'>
                            <a target='_blank' className={SocialHelper.getSocialIconClass(item.label)} href={SocialHelper.getValidLink(item.link)}>{item.label}</a>
                        </Row>
                    )
                }
            </ListItemLabel>
        )
    }
}

export default ProfileCardSocial

ProfileCardSocial.PropTypes = {
    social: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        link: PropTypes.string
    }))
}