import React, { Fragment, Component } from 'react'
import { NavLink } from 'react-router-dom'

let menuItems = [
    {
        to: "",
        text: "Новости"
    },
    {
        to: "profile",
        text: "Профиль"
    },
    {
        to: "signin",
        text: "Войти"
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

                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navigation