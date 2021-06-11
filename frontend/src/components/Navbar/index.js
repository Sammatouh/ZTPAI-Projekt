import React from 'react'
import {
    Nav,
    NavLogo,
    NavbarLink,
    Bars,
    NavMenu,
    NavBtnLink
} from './NavbarElements';

const Navbar = ({ toggle }) => {
    return (
        <>
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
                    <NavBtnLink to="/login">
                        Sign In
                    </NavBtnLink>
                    <NavBtnLink to="/register">
                        Sign Up
                    </NavBtnLink>
                </NavMenu>
            </Nav>
        </>
    )
}

export default Navbar
