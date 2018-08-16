import React, { Component } from 'react';
import AMPDocument from './AMPDocument';
import Statham from './Statham';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li><a href="/">これがtopページ</a></li>
          <li><a href="/statham/おすすめの映画">映画ページ</a></li>
          <li><a href="/article">Shadow AMPページ</a></li>
        </ul>
        <Switch>
          <Route exact path="/" render={() => (<div>Super Freak</div>)} />
          <Route path="/statham/:statham" render={({ match }) => <Statham path={match} />} />
          <Route path="/article" render={({ match }) => <AMPDocument path={match} />} />
        </Switch>
      </div>
    </BrowserRouter>);
}

export default App;