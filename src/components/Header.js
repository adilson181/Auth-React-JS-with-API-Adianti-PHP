import React from "react"
import { history } from '../history'

const Header = () => {
    const logout = () => {
        console.log('logout')
        localStorage.removeItem('app-token');
        history.push('/login')
    }
    return (
        <header>
            <span onClick={logout}>Logout</span>
        </header>
    )
}

export default Header