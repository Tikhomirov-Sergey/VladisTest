import React, { Fragment, Component } from 'react'
import { Container, Preloader as PreloaderMaterialize } from 'react-materialize'

class Preloader extends Component {

    render() {
        return (
            <div className='preloader-holder'>
                <PreloaderMaterialize size='big' />
            </div>
        )
    }
}

export default Preloader