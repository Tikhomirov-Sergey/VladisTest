import React, { Fragment, Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { isAuthorizedSelector, signOut } from '../../ducks/auth'

let menuItems = [
    {
        to: "",
        text: "Новости"
    },
    {
        to: "profile",
        text: "Профиль"
    }
]


class Navigation extends Component {

    render() {
        return (
            <nav>
                <div class="nav-wrapper">
                    <ul class="right">

                        {
                            menuItems.map(item =>
                                <li>
                                    <NavLink to={`/${item.to}`}>{item.text}</NavLink>
                                </li>
                            )
                        }

                        <li>
                            {
                                !this.props.isAuthorized ?  <NavLink to='/signin'>Войти</NavLink> : <a onClick={this.props.signOut}>Выйти</a>
                            }
                        </li>

                    </ul>
                </div>
            </nav>
        )
    }
}

export default connect(
    (state) => ({
        isAuthorized: isAuthorizedSelector(state)
    }),
    { signOut }
)(Navigation)