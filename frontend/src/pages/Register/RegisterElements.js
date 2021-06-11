import styled from 'styled-components';
import {
    Button, Form, FormGroup
} from 'reactstrap'

export const RegisterBox = styled.div`
    margin: auto;
    margin-top: 2rem;
    max-width: 400px;
    align-items: center;
    justify-content: center;
`

export const RegisterForm = styled(Form)`
    border: 1px solid #707070;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.9) 0% 0% no-repeat padding-box;
    align-items: center;
`

export const RegFormGroup = styled(FormGroup)`
    display: block;
    margin: 1rem 1rem 0 1rem;
`

export const SubmitBtn = styled(Button)`
    margin: 1.5rem 1.5rem 0 1.5rem;
    width: 6rem;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #D52A2A;
        color: #fff;
    }
`