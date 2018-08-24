import React from 'react';
import { Route, Link } from 'react-router-dom';
import ArticleList from './ArticleList';
import AMPDocument from './AMPDocument';

const HandlePages = () => {
  const mainCategory = '/(products|web-tech|blockchain|analysis)'
  const subCategory = '/(Blog|React|PWA-AMP|Firebase|Dev|Dapps|CryptoCurrency|Google-Analytics)'
  // メインとサブカテゴリがパスにあり、第三階層に任意の文字が1回以上続く場合に、記事と見なす
  const articlePath = mainCategory + subCategory + '/(.+)'

  return (
    <div>
      <Route exact path="/" render={() => <ArticleList />} />
      <Route path={articlePath} render={({ match }) => <AMPDocument path={match} />} />
    </div>
  );
}

export default HandlePages;