import { useState } from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <header>
            <nav className="navbar">
                <Link to='/' exact className="navbar-logo-link" onClick={closeMobileMenu}>
                    <img className="navbar-logo" src="/img/logo.svg" alt="logo" />
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' exact className='nav-links' onClick={closeMobileMenu}>
                            HOME
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/car-listing' className='nav-links' onClick={closeMobileMenu}>
                            CAR LISTING
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/about-us' className='nav-links' onClick={closeMobileMenu}>
                            ABOUT US
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/contact-us' className='nav-links' onClick={closeMobileMenu}>
                            CONTACT US
                        </Link>
                    </li>
                    <li>
                        <Link to='/login' className='nav-links-mobile' onClick={closeMobileMenu}>
                            SIGN IN
                        </Link>
                    </li>
                </ul>
                <Link to='sign-in'>
                    <button className='nav-btn'>SIGN IN</button>
                </Link>
            </nav>
        </header>
    );
}

export default Navbar
