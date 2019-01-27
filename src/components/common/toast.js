import React, { Component } from 'react'
import { connect } from 'react-redux'
import { errorListSelector, closeError } from '../../ducks/error'

class ToastContainer extends Component {

    constructor(props) {
        super(props)

        this.closeError = this.closeError.bind(this)
    }

    closeError(e, id) {
        this.props.closeError(id)
        e.preventDefault()
    }

    render() {

        return (
            <div className='toast-container'>

                {
                   this.props.errors.map(item => <div className='btn toast col s12' key={item.id} onClick={ (e) => this.closeError(e, item.id) }><span className='toast__toast-text'>{item.message}</span></div>)
                }

            </div>
        )
    }
}

export default connect(
    (state) => ({
        errors: errorListSelector(state)
    }),
    { closeError }
)(ToastContainer)