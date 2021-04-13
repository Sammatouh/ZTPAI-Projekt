import './Footer.css';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="site-footer">
            <p className="ft-title">Car rental service Rent<span style={{ color: "#D52A2A", fontSize: "1.8rem" }}>a</span>Car</p>
            <ul className="ft-links">
                <li><Link to="/" exact>Home</Link></li>
                <li><Link to="/contact-us">Contact Us</Link></li>
                <li><Link to="/car-listing">Car Listing</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/#">Terms of service</Link></li>
                <li><Link to="/#">Privacy policy</Link></li>
                <li><Link to="/#">Cities</Link></li>
            </ul>
            <p className="copyright">Copyright &copy; Rentacar.net All rights reserved</p>
            <div className="ft-lang-choice">
                <img className="ft-flag" src="/img/Flag_of_Poland.png" />
                <img className="ft-flag" src="/img/Flag_of_the_United_Kingdom.png" />
            </div>
        </footer>
    )
}

export default Footer
