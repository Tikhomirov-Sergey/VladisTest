import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col, Card } from 'react-materialize'

class NewsItem extends Component {

    render() {

        return (
            <Col s={12}>
                <Card title={this.props.title}>
                    {this.props.text}
                </Card>
            </Col>
        )
    }
}

export default NewsItem

NewsItem.PropTypes = {
    title: PropTypes.string,
    text: PropTypes.string.isRequired
}