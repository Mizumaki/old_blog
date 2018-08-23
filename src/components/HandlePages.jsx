import React from 'react';
import { Route, Link } from 'react-router-dom';
import ArticleList from './ArticleList';
import AMPDocument from './AMPDocument';

const HandlePages = () => {
  return (
    <div>
      <Route exact path="/" render={() => <ArticleList />} />
      <Route path="/article" render={({ match }) => <AMPDocument path={match} />} />
    </div>
  );
}

export default HandlePages;