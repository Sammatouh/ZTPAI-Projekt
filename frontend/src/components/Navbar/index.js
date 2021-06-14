import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import {
    Nav,
    NavLogo,
    NavbarLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './NavbarElements';


const Navbar = ({ toggle, isLogged, logOut }) => {
    const [state, updateState] = useState(false);
    const history = useHistory();

    useEffect(() => {
        updateState(prev => !prev);
    }, [isLogged])

    function LogOut() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userData');
        logOut(false);
        updateState(prev => !prev);
        history.push("/");
    }

    function AuthActions() {
        return (
            <>
                <NavBtnLink to="/login">
                    Login
                </NavBtnLink>
                <NavBtnLink to="/register">
                    Register
                </NavBtnLink>
            </>
        )
    }

    function LoggedActions() {
        return (
            <>
                <NavbarLink to="/user">
                    USER
                </NavbarLink>
                {JSON.parse(sessionStorage.getItem('userData')).roles.includes("ROLE_ADMIN") ?
                    <NavbarLink to="/admin">ADMIN</NavbarLink> : ''}
                <NavBtn onClick={LogOut}>Logout</NavBtn>
            </>
        )
    }

    return (
        <Nav>
            <NavbarLink to="/">
                <NavLogo src="/img/logo.svg" alt="logo" />
            </NavbarLink>
            <Bars onClick={toggle} />
            <NavMenu>
                <NavbarLink to="/cars">
                    CARS
                </NavbarLink>
                <NavbarLink to="/about">
                    ABOUT
                </NavbarLink>
                <NavbarLink to="/contact">
                    CONTACT
                </NavbarLink>
                {sessionStorage.hasOwnProperty('userData') ? LoggedActions() : (
                    <AuthActions />
                )}
            </NavMenu>
        </Nav>
    )
}

export default Navbar
