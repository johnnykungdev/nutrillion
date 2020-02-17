import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import LandingPage from './containers/LandingPage/LandingPage';
import TagPage from './containers/TagPage/TagPage';

function App() {

    return (
        <Switch>
            <Route to='/tagging' render={() => <TagPage />} />
            <Route to='/' exact render={() => <LandingPage />} />
        </Switch>
    );
}

export default App;
