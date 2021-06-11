import React from 'react';
import axios from 'axios';
import { LoginBox, LoginForm, LoginFormGroup, LoginButton, RegLink, RegLinkBox } from './LoginElements';
import { Label, Input, FormText, FormFeedback } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';


const LoginPage = () => {
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
                let logData = {
                    'email': fields.email,
                    'password': fields.password
                };
                axios.post(`https://localhost:8000/api/login_check`, logData)
                .then(
                    (response) => {
                        console.log(response.data);
                    },
                    (error) => {
                        console.log(error);
                   }
                )
            }}>
            { formik => (
                <LoginBox>
                    <LoginForm onSubmit={formik.handleSubmit} method="POST">
                        <h2>Sign In</h2>
                        <LoginFormGroup>
                            <Label for="email">email</Label>
                            <Input type="email" id="email" placeholder="example@mail.com" {...formik.getFieldProps('email')} className={(formik.errors.email && formik.touched.email ? 'is-invalid' : '')} />
                            { formik.touched.email && formik.errors.email ? (
                                <FormFeedback>{formik.errors.email}</FormFeedback>
                            ) : null }
                        </LoginFormGroup>
                        <LoginFormGroup>
                            <Label for="passwd">password</Label>
                            <Input type="password" id="passwd" placeholder="password" {...formik.getFieldProps('password')} className={(formik.errors.password && formik.touched.password ? 'is-invalid' : '')}/>
                            { formik.touched.password && formik.errors.password ? (
                                <FormFeedback>{formik.errors.password}</FormFeedback>
                            ) : null }
                        </LoginFormGroup>
                        <LoginButton type="submit">Sign In</LoginButton>
                        <RegLinkBox>
                            <FormText>Don't have an account?</FormText>
                            <RegLink to='/register'>Sign Up</RegLink>
                        </RegLinkBox>
                    </LoginForm>
                </LoginBox>
            )}
            </Formik>
    )
}

export default LoginPage
