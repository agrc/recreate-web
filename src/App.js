import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import MapView from './MapView';
import FeatureDetails from './FeatureDetails';

import './css/App.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <header className='header'>
          <Link to='/'>Recreation.Utah.Gov</Link>
        </header>
        <div className='main'>
          <Switch>
            <Route exact={true} path='/' component={Home} />
            <Route path='/map/:location?/:list?' component={MapView} />
            <Route path='/feature/:id' component={FeatureDetails} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
