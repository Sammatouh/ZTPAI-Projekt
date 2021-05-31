import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <Router>
                <Sidebar isOpen={isOpen} toggle={toggle}/>
                <Navbar toggle={toggle}/>
                <Footer />
            </Router>
        </>
    );
}

export default App
