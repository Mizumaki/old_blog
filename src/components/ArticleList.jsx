import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';

const styles = StyleSheet.create({
  wrap: {
    padding: '3rem 1rem',
  },
});

const ArticleList = () => {
  const articleData = {
    "title": "トリュフのペットショップチュートリアルをやる",
    "subCategory": "Dapps",
    "lead": "SolidityとTruffleを使った開発になれるため、16匹のペットを売買するペットショップサイトを開設してみましょう。",
    "date": "2018/09/03"
  }
  return (
    <div className={css(styles.wrap)}>
      <Link to="/blockchain/Dapps/Truffle-pet-shop-tutorial">
        <BlogCard title={articleData.title} subCategory={articleData.subCategory} lead={articleData.lead} date={articleData.date} />
      </Link>
    </div>
  );
}

export default ArticleList;