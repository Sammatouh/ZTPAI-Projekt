import { Link } from "react-router-dom";
import styled from 'styled-components';

export const StyledFooter = styled.footer`
    margin: auto;
    margin-top: 2rem;
    background-color: #222227;
    color: #E4E4E4;
    padding: 1rem 0 1rem 0;
`

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
`

export const StyledLink = styled(Link)`
    text-decoration: none;
    display: block;
    color: #E4E4E4;
    padding: 1rem;

    &:hover{
        color: #D52A2A;
    }
`

export const FooterText = styled.p`
    color: ${props => props.color ?? "white"};
    font-size: ${props => props.fontSize ?? 1.8}rem;
    text-align: center;
`