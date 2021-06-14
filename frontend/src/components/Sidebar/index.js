import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SidebarBtn,
    SidebarBtnWrap,
    SidebarRoute
} from './SidebarElemets';


const Sidebar = ({ isOpen, toggle, isLogged, logOut }) => {
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
            <SidebarBtnWrap>
                <SidebarRoute to="/login">
                    LOGIN
                </SidebarRoute>
                <SidebarRoute to="/register">
                    REGISTER
                </SidebarRoute>
            </SidebarBtnWrap>
        )
    }

    function LoggedActions() {
        return (
            <>
                <SidebarLink to="/user">
                    USER
                </SidebarLink>
                {JSON.parse(sessionStorage.getItem('userData')).roles.includes("ROLE_ADMIN") ?
                    <SidebarLink to="/admin">ADMIN</SidebarLink> : ''}
                <SidebarBtnWrap>
                    <SidebarBtn onClick={LogOut}>LOGOUT</SidebarBtn>
                </SidebarBtnWrap>
            </>
        )
    }

    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="/cars">
                        CARS
                    </SidebarLink>
                    <SidebarLink to="/about">
                        ABOUT
                    </SidebarLink>
                    <SidebarLink to="/contact">
                        CONTACT
                    </SidebarLink>
                    {sessionStorage.hasOwnProperty('userData') ? LoggedActions() : (
                        <AuthActions />
                    )}

                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
