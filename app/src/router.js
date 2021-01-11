import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './containers/Home';
import About from './containers/About';
import Results from './containers/Results';
import Faq from './containers/Faq'

function AppRouter() {
    return (
        <Router>
            <Route path="/" exact component={Home}/>
            <Route path="/home" exact component={Home}/>
            <Route path="/about" exact component={About}/>
            <Route path="/results" exact component={Results}/>
            <Route path="/faq" exact component={Faq}/>
        </Router>
    )
}

export default AppRouter;