import React, { Component } from 'react'
import { Row } from 'react-materialize'

class ListItemSpan extends Component {

    render() {

        if(this.props.textIsRequired && !this.props.text)
            return null

        return (
            <Row>
                <span>{this.props.title}: {this.props.text}</span>
            </Row>
        )
    }
}

export default ListItemSpan