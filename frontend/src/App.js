import { React, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './components/privateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import CarListing from './pages/CarListing';
import AdminPage from './pages/AdminPage';
import CarRent from './pages/CarRent';
import UserPage from './pages/UserPage';

const Roles = {
    admin: "ROLE_ADMIN",
    user: "ROLE_USER"
}

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <Router>
                <Sidebar isOpen={isOpen} toggle={toggle} isLogged={loggedIn} logOut={setLoggedIn} />
                <Navbar toggle={toggle} isLogged={loggedIn} logOut={setLoggedIn}/>
                <Switch>
                    <Route exact path="/" />
                    <Route path='/login'>
                        <Login onLogin={setLoggedIn} />
                    </Route>
                    <Route path='/register' component={Register} />
                    <Route path='/cars' component={CarListing} />
                    <PrivateRoute path="/admin" roles={[Roles.admin]} component={AdminPage} />
                    <PrivateRoute path="/rent" roles={[Roles.user]} component={CarRent} />
                    <PrivateRoute path="/user" roles={[Roles.user]} component={UserPage} />
                </Switch>
                <Footer />
            </Router>
        </>
    );
}

export default App
