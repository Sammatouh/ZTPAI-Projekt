import styled from 'styled-components';
import { Input, Button, Form } from 'reactstrap';

export const PageContainer = styled.div`
    background: rgba(255, 255, 255, 0.9) 0% 0% no-repeat padding-box;
    min-height: 76vh;
    max-width: 1100px;
    margin: 2rem auto;
    padding: 10px 24px 0 24px;
    border: 1px solid #707070;
    display: flex;
    flex-direction: column;
`

export const PageTitleDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`

export const MyHr = styled.hr`
    width: 100%;
    margin-bottom: 2rem;
`

export const ContentContainer = styled.div`
    display: flex;
`

export const StyledAside = styled.aside`
    width: 250px;
`

export const StyledMain = styled.main`
    width: 100%;
    margin: 0.5rem 0;
`

export const FilterSection = styled.section`
    border-bottom: 1px solid #707070;
    margin: 0.5rem 0.5rem 0.5rem 0;
    padding: 5px;
`

export const CheckboxGroup = styled.div`
    display: flex;
    flex-direction: column;
    
`

export const NumberInputs = styled.div`
    display: flex;
    justify-content: space-between;

    & > * {
        width: calc(50% - 0.5rem);
    }
`

export const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`

export const SearchInput = styled(Input)`
    width: 250px;
    margin-right: 1rem;
`

export const SearchButton = styled(Button)`
    width: 6rem;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #D52A2A;
        color: #fff;
    }
`

export const SearchForm = styled(Form)`
    width: 100%;
    display: flex;
    justify-content: left;
`

export const ItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`