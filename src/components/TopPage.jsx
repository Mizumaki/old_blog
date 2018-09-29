import React from 'react';
import { StyleSheet } from 'aphrodite';
import ArticleList from './ArticleList';
import { Link } from 'react-router-dom';

const styles = StyleSheet.create({
  wrap: {},
});

const TopPage = () => {
  return (
    <div>
      <ArticleList type="latest" query="?count=5" />
    </div>
  );
}

export default TopPage;