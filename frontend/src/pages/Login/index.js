import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { LoginBox, LoginForm, LoginFormGroup, LoginButton, RegLink, RegLinkBox } from './LoginElements';
import { Label, Input, FormText, FormFeedback, Spinner } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';


const LoginPage = ({ onLogin }) => {
    const [logging, setLogging] = useState(false);
    const [message, setMessage] = useState('');

    const history = useHistory();

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={Yup.object({
                email: Yup.string().required('email is required'),
                password: Yup.string().required('password is required')
            })}
            onSubmit={(fields) => {
                setLogging(true);
                setMessage('');
                let logData = {
                    'email': fields.email,
                    'password': fields.password
                };
                fields.email = '';
                fields.password = '';
                axios.post(`https://localhost:8000/api/login_check`, logData)
                    .then(
                        (response) => {
                            sessionStorage.setItem('token', response.data.token)
                            const userData = JSON.parse(atob(response.data.token.split('.')[1]));
                            sessionStorage.setItem('userData', JSON.stringify(userData));
                            setLogging(false);
                            onLogin(true);
                            history.push("/cars");
                        },
                        (error) => {
                            setMessage(error.response.data.message);
                            setLogging(false);
                        })
            }}>
            {formik => (
                <LoginBox>
                    <LoginForm onSubmit={formik.handleSubmit} method="POST">
                        <h2>Login</h2>
                        <LoginFormGroup>
                            <Label for="email">email</Label>
                            <Input type="email" id="email" placeholder="example@mail.com" {...formik.getFieldProps('email')} className={(formik.errors.email && formik.touched.email ? 'is-invalid' : '')} />
                            {formik.touched.email && formik.errors.email ? (
                                <FormFeedback>{formik.errors.email}</FormFeedback>
                            ) : null}
                        </LoginFormGroup>
                        <LoginFormGroup>
                            <Label for="passwd">password</Label>
                            <Input type="password" id="passwd" placeholder="password" {...formik.getFieldProps('password')} className={(formik.errors.password && formik.touched.password ? 'is-invalid' : '')} />
                            {formik.touched.password && formik.errors.password ? (
                                <FormFeedback>{formik.errors.password}</FormFeedback>
                            ) : null}
                        </LoginFormGroup>
                        <LoginButton type="submit">Login</LoginButton>
                        {logging ? (
                            <Spinner color="secondary" />
                        ) : (
                            message ? message : ''
                        )}
                        <RegLinkBox>
                            <FormText>Don't have an account?</FormText>
                            <RegLink to='/register'>Register</RegLink>
                        </RegLinkBox>
                    </LoginForm>
                </LoginBox>
            )}
        </Formik>
    )
}

export default LoginPage
