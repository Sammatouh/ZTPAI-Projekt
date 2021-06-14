import React from 'react';
import styled from 'styled-components';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const CarCard = styled(Card)`
    height: 180px;
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5rem;
    opacity: ${props => (props.stock === 0) ? "0.6" : "1"};
`

const CarImg = styled(CardImg)`
    width: auto;
    height: 100%;
`

const CarInfo = styled(CardText)`
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`

const BottomDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

const StockDiv = styled.div`
    color: ${props => (props.stock < 2) ? "#eb4034" : ((props.stock < 6) ? "#ebb434" : "#22ba2c")};
`

const RentBttn = styled(Button)`
    transition: all 0.2s ease-in-out;
    pointer-events: ${props => (props.stock === 0) ? "none" : "all"};

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #D52A2A;
        color: #fff;
    }
`

const CarDiv = ({item}) => {
    return (
        <CarCard>
            <CarImg src={"https://localhost:8000" + item.image} />
            <CardBody>
                <CardTitle tag="h5">{item.brand + " | " + item.name}</CardTitle>
                <CardSubtitle className="mb-2 text-muted">{item.doors + '-door ' + item.type}</CardSubtitle>
                <CarInfo>{item.info}</CarInfo>
                <BottomDiv>
                    <div>Price: {item.pricePerDay/100}$/day</div>
                    <StockDiv stock={item.stock}>Stock: {item.stock}</StockDiv>
                    <RentBttn stock={item.stock}>Rent</RentBttn>
                </BottomDiv>
            </CardBody>
        </CarCard>
    )
}

export default CarDiv
