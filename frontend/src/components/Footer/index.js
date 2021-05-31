import {
    StyledFooter,
    Container,
    StyledLink,
    FooterText
} from './FooterElements'

const Footer = () => {
    return (
        <StyledFooter>
            <FooterText>Car rental service Rent<span style={{ color: "#D52A2A", fontSize: "1.8rem" }}>a</span>Car</FooterText>
            <Container>
                <StyledLink to="/" exact>Home</StyledLink>
                <StyledLink to="/contact-us">Contact Us</StyledLink>
                <StyledLink to="/car-listing">Car Listing</StyledLink>
                <StyledLink to="/about-us">About Us</StyledLink>
                <StyledLink to="/#">Terms of service</StyledLink>
                <StyledLink to="/#">Privacy policy</StyledLink>
                <StyledLink to="/#">Cities</StyledLink>
            </Container>
            <FooterText color={"#f2bd85"} fontSize={1.1}>Copyright &copy; Rentacar.net All rights reserved</FooterText>
        </StyledFooter>
    )
}

export default Footer