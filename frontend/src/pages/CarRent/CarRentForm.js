import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { 
    Card, CardBody, CardTitle, CardImg, CardSubtitle, CardText,
    Button, Form, FormGroup, FormFeedback, Label, Input 
} from 'reactstrap';
import { Formik, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const CarCard = styled(Card)`
    width: 60%;
    height: auto;
    margin: 0 auto;

    @media screen and (max-width: 778px) {
        width: 70%;
    }

    @media screen and (max-width: 600px) {
        width: 80%;
    }
`

const BottomDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

const StockDiv = styled.div`
    color: ${props => (props.stock < 2) ? "#eb4034" : ((props.stock < 6) ? "#ebb434" : "#22ba2c")};
`

const FormRow = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 0.5rem 0;
`

const FormBottomDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const BottomFormGroup = styled(FormGroup)`
    max-width: 250px;
    margin: 0 auto 0.5rem auto;
`

const RentBtn = styled(Button)`
    margin: 0 auto;
    width: 6rem;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #D52A2A;
        color: #fff;
    }
`

const ValueField = (props) => {
    const {
        values: {pickUpDate, dropOffDate},
        touched,
        setFieldValue,
    } = useFormikContext();
    const [field, meta] = useField(props);

    useEffect(() => {
        const date1 = new Date(pickUpDate);
        const date2 = new Date(dropOffDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setFieldValue(props.name, diffDays * props.pricePerDay / 100);
    }, [pickUpDate, dropOffDate, touched.pickUpDate, touched.dropOffDate, setFieldValue, props.name])

    return (
        <>
            <Input {...props} {...field} />
            {!!meta.touched && !!meta.error && <FormFeedback>{meta.error}</FormFeedback>}
        </>
    )
}

const CarRentForm = ({ car, locations }) => {
    const history = useHistory();

    function today() {
        let tod = new Date();
        tod.setDate(tod.getDate() - 1);
        return tod;
    }

    function dateSetUp() {
        let dat = (new Date()).toISOString();
        return dat.split("T")[0];
    }

    return (
        <>
            <h2>Make a reservation</h2>
            <hr style={{width: '100%'}} />
            <CarCard>
                <CardImg src={"https://localhost:8000" + car.image} />
                <CardBody>
                    <CardTitle tag="h5">{car.brand + " | " + car.name}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted">{car.doors + '-door ' + car.type}</CardSubtitle>
                    <CardText>{car.info}</CardText>
                    <BottomDiv>
                        <div>Price: {car.pricePerDay/100}$/day</div>
                        <StockDiv stock={car.stock}>Stock: {car.stock}</StockDiv>
                    </BottomDiv>
                </CardBody>
            </CarCard>
            <hr style={{width: '100%'}} />
            <Formik
                initialValues={{
                    pickUpLoc: 1,
                    pickUpDate: dateSetUp(),
                    dropOffLoc: 1,
                    dropOffDate: dateSetUp(),
                    rentalValue: 0,
                }}
                validationSchema={Yup.object({
                    pickUpLoc: Yup.number().required(),
                    pickUpDate: Yup.date().required("Pick up date is required").min(today(), "Must be at least today"),
                    dropOffLoc: Yup.number().required(),
                    dropOffDate: Yup.date().required("Drop off date is required").min(new Date(), "Must be at least tomorrow"),
                    rentalValue: Yup.number().moreThan(0)
                })}
                onSubmit={(fields) => {
                    let data = {
                        "car": car.id,
                        "pickUpLocation": parseInt(fields.pickUpLoc),
                        "dropOffLocation": parseInt(fields.dropOffLoc),
                        "whenBooked": new Date(fields.pickUpDate),
                        "whenDue": new Date(fields.dropOffDate),
                        "value": fields.rentalValue
                    };
                    let token = sessionStorage.getItem("token");
                    axios.post('https://localhost:8000/api/rentals', data, { headers: {'Authorization': 'Bearer ' + token}})
                    // axios({
                    //     method: 'post',
                    //     url: 'https://localhost:8000/api/rentals',
                    //     headers: {
                    //         'Authotization': 'Bearer ' + sessionStorage.getItem("token"),
                    //         'Content-Type': 'application/json'},
                    //     data: data
                    // })
                    .then((response) => {
                        alert(response.data.message);
                        history.push("/user")
                    })
                }}
            >
                {formik => (
                    <Form onSubmit={formik.handleSubmit} method="POST">
                        <FormRow>
                            <FormGroup>
                                <Label>Pick up</Label>
                                <Input 
                                    type="select" 
                                    id="pickUpLoc" 
                                    {...formik.getFieldProps('pickUpLoc')}
                                    className={(formik.errors.pickUpLoc && formik.touched.pickUpLoc ? 'is-invalid' : '')}
                                >
                                    {locations.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))}
                                </Input>
                                <Input 
                                    id="pickUpDate" 
                                    type="date" 
                                    {...formik.getFieldProps('pickUpDate')} 
                                    className={(formik.errors.pickUpDate && formik.touched.pickUpDate ? 'is-invalid' : '')}
                                />
                                {formik.touched.pickUpDate && formik.errors.pickUpDate ? (
                                    <FormFeedback>{formik.errors.pickUpDate}</FormFeedback>
                                ) : null}
                            </FormGroup>
                            <FormGroup>
                                <Label>Drop off</Label>
                                <Input 
                                    type="select" 
                                    id="dropOffLoc" 
                                    {...formik.getFieldProps('dropOffLoc')} 
                                    className={(formik.errors.dropOffLoc && formik.touched.dropOffLoc ? 'is-invalid' : '')}
                                >
                                    {locations.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))}
                                </Input>
                                <Input id="dropOffDate" type="date" {...formik.getFieldProps('dropOffDate')} className={(formik.errors.dropOffDate && formik.touched.dropOffDate ? 'is-invalid' : '')}/>
                                {formik.touched.dropOffDate && formik.errors.dropOffDate ? (
                                    <FormFeedback>{formik.errors.dropOffDate}</FormFeedback>
                                ) : null}
                            </FormGroup>
                        </FormRow>
                        <FormBottomDiv>
                            <BottomFormGroup>
                                <Label>You pay ($)</Label>
                                <ValueField type="number" name="rentalValue" pricePerDay={car.pricePerDay} readOnly/>
                            </BottomFormGroup>
                            <RentBtn type="submit">Rent</RentBtn>
                        </FormBottomDiv>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default CarRentForm
