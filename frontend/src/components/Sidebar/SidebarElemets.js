import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';


export const SidebarContainer = styled.aside`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: #3E3E3E;
    display: grid;
    align-items: center;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
`

export const CloseIcon = styled(FaTimes)`
    color: #fff;
`

export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`

export const SidebarWrapper = styled.div`
    color: #fff;
`

export const SidebarMenu = styled.ul`
    padding: 0;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 80px);
    text-align: center;

    @media screen and (max-width: 768px) {
        grid-template-rows: repeat(6, 60px);
    }
`

export const SidebarLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    text-decoration: none;
    list-style: none;
    transition: 0.2s ease-in-out;
    color: #fff;
    cursor: pointer;

    &:hover {
        color: #D52A2A;
        transition: 0.2s ease-in-out;
    }
`

export const SidebarBtnWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const SidebarRoute = styled(Link)`
    border-radius: 50px;
    background: #D52A2A;
    white-space: nowrap;
    padding: 16px 64px;
    margin: 0.5rem;
    color: #fff;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #D52A2A;
    }
`

export const SidebarBtn = styled(Button)`
    border-radius: 50px;
    background: #D52A2A;
    white-space: nowrap;
    margin: 0.5rem;
    color: #fff;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-ease-in-out;
    font-size: 1.4rem;
    width: 50%;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #D52A2A;
    }
`