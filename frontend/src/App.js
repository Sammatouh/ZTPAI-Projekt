import './App.css';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Footer />
            </Router>
        </>
    );
}

export default App
