import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
    Button, Form, FormGroup
} from 'reactstrap'


export const LoginBox = styled.div`
    /* display: flex; */
    margin: auto;
    margin-top: 5rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    height: 90vh;
`

export const LoginForm = styled(Form)`
    border: 1px solid #707070;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.9) 0% 0% no-repeat padding-box;
    /* display: flex; */
    flex-direction: column;
    align-items: center;
`

export const LoginFormGroup = styled(FormGroup)`
    margin: 1rem 1rem 0 1rem;
`

export const LoginButton = styled(Button)`
    margin: 1.5rem;
    width: 6rem;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #D52A2A;
        color: #fff;
    }
`

export const RegLink = styled(Link)`
    text-decoration: none;
    color: #D52A2A;

    &:hover {
        color: #f57d7d;
    }
`

export const RegLinkBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
