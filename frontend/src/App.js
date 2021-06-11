import { React, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
// import CarListing from './pages/CarListing';

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
                <Switch>
                    <Route exact path="/" />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    {/* <Route path='/cars' component={CarListing} /> */}
                </Switch>
                <Footer />
            </Router>
        </>
    );
}

export default App
