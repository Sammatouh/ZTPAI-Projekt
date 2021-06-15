import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CarRentForm from './CarRentForm';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { RentContainer } from './CarRentElements';

const CarRent = () => {
    const [loading, setLoading] = useState(false);
    const [car, setCar] = useState({});
    const [locations, setLocations] = useState([]);
    const [outOfStock, setOutOfStock] = useState(false);

    const history = useHistory();

    useEffect(() => {
        setLoading(true);
        axios.get(`https://localhost:8000/api/cars/${history.location.state}`)
            .then((response) => {
                setCar(response.data);
                if(response.data.stock === 0) setOutOfStock(true);
                setLoading(false);
            },
            (error) => {
                alert(error);
            })
        axios.get("https://localhost:8000/api/locations")
            .then((response) => {
                setLocations(response.data)
        })
    }, [])

    return (
        <RentContainer>
            {loading ? (
                <Spinner color="secondary" style={{width: '4rem', height: '4rem'}} />
            ) : (
                outOfStock ? (
                    'The car you want to rent is currently unavailable'
                ) : (
                    <CarRentForm car={car} locations={locations}/>
                )
            )}
        </RentContainer>
    )
}

export default CarRent
