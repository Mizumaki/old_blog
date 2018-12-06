import * as React from 'react';
import ArticleList from '../containers/ArticleList';
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