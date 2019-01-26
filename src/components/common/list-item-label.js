import React, { Component } from 'react'
import { Row } from 'react-materialize'

class ListItemSpan extends Component {

    render() {

        if(this.props.textIsRequired && !this.props.children)
            return null

        return (
            <Row>
                {this.props.title && <span>{this.props.title}: </span>}
                {this.props.children}
            </Row>
        )
    }
}

export default ListItemSpan