import React from 'react';
import { withRouter } from 'react-router';
import ArticleList from './ArticleList';
import CategoryList from './CategoryList';

const TopPage = () => {
  return (
    <div>
      <ArticleList type="latest" query="?count=5" />
      <CategoryList />
    </div>
  );
}

export default TopPage;