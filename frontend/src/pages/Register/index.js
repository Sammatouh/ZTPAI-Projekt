import React from 'react';
import { RegisterBox, RegisterForm, RegFormGroup, SubmitBtn } from './RegisterElements';
import { Label, Input, FormFeedback } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Register = () => {
    return (
        <Formik
            initialValues={{
                name: '',
                surname: '',
                email: '',
                password: '',
                confPassword: '',
                phone: '',
                acceptTerms: false
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .max(100, 'Must be 100 characters or less')
                    .required('Name is required'),
                surname: Yup.string()
                    .max(120, 'Must be 120 characters or less')
                    .required('Surname is required'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Email is required'),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is required'),
                confPassword: Yup.string()
                    .required('Password confirmation is required')
                    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
                phone: Yup.number()
                    .integer('Phone must be an integer')
                    .required('Phone is required'),
                acceptTerms: Yup.bool()
                    .oneOf([true], 'You must accept Terms & Conditions')
            })}
            onSubmit={fields => {
                let regData = {
                    'name': fields.name,
                    'surname': fields.surname,
                    'email': fields.email,
                    'password': fields.password,
                    'phone': fields.phone
                };
                axios.post('https://localhost:8000/api/register', regData)
                .then((response) => {
                    console.log(response.data);
                },
                (error) => {
                    console.log(error);
                })
            }}>
            { formik => (
                <RegisterBox>
                    <RegisterForm onSubmit={formik.handleSubmit} method="POST">
                        <h2>Sign Up</h2>
                        <RegFormGroup>
                            <Label for="name">name</Label>
                            <Input type="text" id="name" {...formik.getFieldProps('name')} className={(formik.errors.name && formik.touched.name ? 'is-invalid' : '')}/>
                            { formik.touched.name && formik.errors.name ? (
                                <FormFeedback>{formik.errors.name}</FormFeedback>
                            ) : null }
                        </RegFormGroup>
                        <RegFormGroup>
                            <Label for="surname">surname</Label>
                            <Input type="text" id="surname" {...formik.getFieldProps('surname')} className={(formik.errors.surname && formik.touched.surname ? 'is-invalid' : '')}/>
                            { formik.touched.surname && formik.errors.surname ? (
                                <FormFeedback>{formik.errors.surname}</FormFeedback>
                            ) : null }
                        </RegFormGroup>
                        <RegFormGroup>
                            <Label for="email">email</Label>
                            <Input type="email" id="email" {...formik.getFieldProps('email')} className={(formik.errors.email && formik.touched.email ? 'is-invalid' : '')}/>
                            { formik.touched.email && formik.errors.email ? (
                                <FormFeedback>{formik.errors.email}</FormFeedback>
                            ) : null }
                        </RegFormGroup>
                        <RegFormGroup>
                            <Label for="password">password</Label>
                            <Input type="password" id="password" {...formik.getFieldProps('password')} className={(formik.errors.password && formik.touched.password ? 'is-invalid' : '')}/>
                            { formik.touched.password && formik.errors.password ? (
                                <FormFeedback>{formik.errors.password}</FormFeedback>
                            ) : null }
                        </RegFormGroup>
                        <RegFormGroup>
                            <Label for="confPassword">confirm password</Label>
                            <Input type="password" id="confPassword" {...formik.getFieldProps('confPassword')} className={(formik.errors.confPassword && formik.touched.confPassword ? 'is-invalid' : '')}/>
                            { formik.touched.confPassword && formik.errors.confPassword ? (
                                <FormFeedback>{formik.errors.confPassword}</FormFeedback>
                            ) : null }
                        </RegFormGroup>
                        <RegFormGroup>
                            <Label for="phone">phone</Label>
                            <Input type="text" id="phone" {...formik.getFieldProps('phone')} className={(formik.errors.phone && formik.touched.phone ? 'is-invalid' : '')}/>
                            { formik.touched.phone && formik.errors.phone ? (
                                <FormFeedback>{formik.errors.phone}</FormFeedback>
                            ) : null }
                        </RegFormGroup>
                        <RegFormGroup check>
                            <Input type="checkbox" id="acceptTerms" {...formik.getFieldProps('acceptTerms')} className={(formik.errors.acceptTerms && formik.touched.acceptTerms ? 'is-invalid' : '')}/>
                            <Label check>Accept Terms & Conditions</Label>
                            { formik.touched.acceptTerms && formik.errors.acceptTerms ? (
                                <FormFeedback>{formik.errors.acceptTerms}</FormFeedback>
                            ) : null }
                        </RegFormGroup>
                        <SubmitBtn type="submit">Sign Up</SubmitBtn>
                    </RegisterForm>
                </RegisterBox>
            )}
        </Formik>
    )
}

export default Register
