import { FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
    background: #3E3E3E;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 2rem;
    font-size: 1.2rem;
`
export const NavLogo = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(40%, 45%);
    cursor: pointer;
    height: 2.5rem;
`

export const NavbarLink = styled(NavLink)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
  
    &.active {
        color: #D52A2A;
    }
`

export const Bars = styled(FaBars)`
    display: none;
    color: #fff;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavBtnLink = styled(NavLink)`
    border-radius: 4px;
    background: #D52A2A;
    padding: 10px 22px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    margin-left: 24px;
    
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`;