import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './containers/Home';
import About from './containers/About';
import Contact from './containers/Contact';
import Faq from './containers/Faq'

function AppRouter() {
    return (
        <Router>
            <Route path="/" exact component={Home}/>
            <Route path="/home" exact component={Home}/>
            <Route path="/about" exact component={About}/>
            <Route path="/contact" exact component={Contact}/>
            <Route path="/faq" exact component={Faq}/>
        </Router>
    )
}

export default AppRouter;