import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarDiv from './CarDiv';
import { Input, Label, FormGroup, Spinner } from 'reactstrap';
import CheckboxFilter from './CheckboxFilter';
import { 
    PageContainer,
    ContentContainer,
    PageTitleDiv,
    MyHr,
    StyledAside,
    StyledMain,
    SearchBar,
    SearchForm,
    SearchInput,
    SearchButton,
    FilterSection,
    CheckboxGroup,
    NumberInputs,
    ItemsContainer
} from './CarListingElements';


const CarListing = () => {
    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState([]);
    const [types, setTypes] = useState([]);
    const [doors, setDoors] = useState([]);

    const [loadCars, setLoadCars] = useState(false);
    const [loadBrands, setLoadBrands] = useState(false);
    const [loadTypes, setLoadTypes] = useState(false);
    const [loadDoors, setLoadDoors] = useState(false);

    const [search, setSearch] = useState('');
    const [brandFilter, setBrandFilter] = useState([]);
    const [typeFilter, setTypeFilter] = useState([]);
    const [doorFilter, setDoorFilter] = useState([]);
    const [priceMinFilter, setPriceMinFilter] = useState('');
    const [priceMaxFilter, setPriceMaxFilter] = useState('');
    const [avFilter, setAvFilter] = useState(false);


    useEffect(() => {
        setLoadBrands(true);
        setLoadCars(true);
        setLoadTypes(true);
        setLoadDoors(true);

        axios.get('https://localhost:8000/api/cars')
        .then((response) => {
            setCars(response.data);
            setLoadCars(false);
            setBrands([...new Set(response.data.map(x => x.brand))]);
            setLoadBrands(false);
            setTypes([...new Set(response.data.map(x => x.type))]);
            setLoadTypes(false);
            setDoors([...new Set(response.data.map(x => x.doors))]);
            setLoadDoors(false);
        },
        (error) => {
            alert(error);
        })
    }, [])

    async function filterCars() {
        setLoadCars(true);
        let query = '?'
        query += search ? `name=${search}&` : '';
        query += (brandFilter.length !== 0) ? `brand=${brandFilter.toString()}&` : '';
        query += (typeFilter.length !== 0) ? `type=${typeFilter.toString()}&` : '';
        query += (doorFilter.length !== 0) ? `door=${doorFilter.toString()}&` : '';
        query += priceMinFilter ? `priceMin=${priceMinFilter}&` : '';
        query += priceMaxFilter ? `priceMax=${priceMaxFilter}&` : '';
        query += avFilter ? `av=${avFilter}&` : '';

        axios.get('https://localhost:8000/api/cars' + query)
        .then((response) => {
            setCars(response.data);
            setLoadCars(false);
        },
        (error) => {
            alert(error);
        })
    }

    useEffect(() => {
        filterCars();
    }, [brandFilter, typeFilter, doorFilter, priceMinFilter, priceMaxFilter, avFilter])

    function handleSearch(event) {
        event.preventDefault();
        filterCars();
    }

    return (
        <PageContainer>
            <PageTitleDiv>
                <h1>Car listing</h1>
                <MyHr/>
            </PageTitleDiv>
            <ContentContainer>
            <StyledAside>
                <FilterSection>
                    <h4>Brand</h4>
                    <CheckboxGroup>
                        {loadBrands ? (
                            <Spinner color="secondary" />
                        ) : (
                            <CheckboxFilter list={brands} handleFilters={brandFilter => setBrandFilter(brandFilter)}/>
                        )}
                    </CheckboxGroup>
                </FilterSection>
                <FilterSection>
                    <h4>Body style</h4>
                    <CheckboxGroup>
                        {loadTypes ? (
                            <Spinner color="secondary" />
                        ) : (
                            <CheckboxFilter list={types} handleFilters={typeFilter => setTypeFilter(typeFilter)}/>
                        )}
                    </CheckboxGroup>
                </FilterSection>
                <FilterSection>
                    <h4>Doors</h4>
                    <CheckboxGroup>
                        {loadDoors ? (
                            <Spinner color="secondary" />
                        ) : (
                            <CheckboxFilter list={doors} handleFilters={doorFilter => setDoorFilter(doorFilter)}/>
                        )}
                    </CheckboxGroup>
                </FilterSection>
                <FilterSection>
                    <h4>Price</h4>
                    <NumberInputs>
                        <FormGroup>
                            <Label>min</Label>
                            <Input type="number" min="0" onChange={(e) => setPriceMinFilter(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>max</Label>
                            <Input type="number" min="0" onChange={(e) => setPriceMaxFilter(e.target.value)}/>
                        </FormGroup>
                    </NumberInputs>
                </FilterSection>
                <FilterSection>
                    <h4>Stock</h4>
                    <FormGroup check>
                        <Input type="checkbox" onChange={(e) => setAvFilter(e.target.checked)}/>
                        <Label check>available</Label>
                    </FormGroup>
                </FilterSection>
            </StyledAside>
            <StyledMain>
                <SearchBar>
                    <SearchForm onSubmit={handleSearch}>
                        <SearchInput type="text" placeholder="Search for car by model..." onChange={(e) => setSearch(e.target.value)}/>
                        <SearchButton>Search</SearchButton>
                    </SearchForm>
                </SearchBar>
                <hr />
                <ItemsContainer>
                    {loadCars ? (
                        <Spinner color="secondary" />
                    ) : (
                        cars.map((item, index) => (
                            <CarDiv key={index} item={item} />
                        ))
                    )}
                </ItemsContainer>
            </StyledMain>
            </ContentContainer>
        </PageContainer>
    )
}

export default CarListing
