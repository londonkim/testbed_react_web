import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, Link, Switch } from 'react-router-dom'

import About from './About'
import Home from './Home'
import Profile from './Profile'
import Profiles from './Profiles'
import HistorySample from './HistorySample'

function App() {
  return (
    <div>
      
      <div>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/about">소개</Link>
          </li>

          <li>
            <Link to="/profile/velopert">velopert profile</Link>
          </li>

          <li>
            <Link to="/history">History</Link>
          </li>
        </ul>
      </div>

      <Switch>

        <Route path="/" component={Home} exact={true} />
        <Route path="/about" component={About} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/history" component={HistorySample} />


        <Route render={
          ({location}) => (<div>페이지가 없다 {location.pathname}</div>)
        }>

        </Route>
      </Switch>

    </div>
  );
}

export default App;
