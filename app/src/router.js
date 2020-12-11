import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './containers/Home';
import About from './containers/About';
import Results from './containers/Results';


function AppRouter() {
    return (
        <Router>
            <Route path="/" exact component={Home}/>
            <Route path="/home" exact component={Home}/>
            <Route path="/about" exact component={About}/>
            <Route path="/results" exact component={Results}/>
        </Router>
    )
}

export default AppRouter;