import React from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom'
import DocumentTitle from 'react-document-title';
import ArticleList from './ArticleList';
import CategoryList from './CategoryList';
import AMPDocument from './AMPDocument';
import TopPage from './TopPage';
import MySelfPage from './MySelfPage';

class HandlePages extends React.Component {
  constructor(props) {
    super(props);
  }
  // GAにPVを送る
  componentDidUpdate(prevProps) {
    console.log('in App ComponentDidUpdate');
    const gtag = window.gtag
    const prevLocation = prevProps.location;
    const prevHistory = prevProps.history;

    if (prevLocation.pathname === this.props.location.pathname) {
      console.log('in equal');
      return;
    }

    // actionがPUSHかつ、gtagがfunction、つまりlocalhostでない場合
    if (prevHistory.action === 'PUSH' && typeof (gtag) === 'function') {
      console.log('in gtag func');
      console.log(this.props.location.pathname);
      gtag('config', 'UA-124960219-1', {
        //'page_location': window.location.href,
        'page_path': this.props.location.pathname
      });
    }
  }

  render() {
    const mainCategory = '/:main(products|front-end|server-side|blockchain|analysis)'
    const subCategory = '/:sub(NomadTime|Blazing-Fast-Blog|React|PWA-AMP|HTML-CSS-JS|Firebase|Nodejs|Ruby|Java|Dapps|Cryptocurrency|Google-Analytics)'
    // メインとサブカテゴリがパスにあり、第三階層に任意の文字が1回以上続く場合に、記事と見なす
    const articlePath = mainCategory + subCategory + '/:fileName(.+)'
    return (
      <div>
        <Route exact path="/" render={() =>
          <DocumentTitle title="BLAZING FAST">
            <TopPage />
          </DocumentTitle>
        } />

        <Route exact path="/Who-the-F-are-you" render={() =>
          <MySelfPage />
        } />

        <Route exact path="/tags" render={() =>
          <div>
            <DocumentTitle title={"タグ：" + this.props.location.search.replace('?name=', '') + " の記事一覧"}>
              <ArticleList type="tags" query={this.props.location.search} />
            </DocumentTitle>
            <CategoryList />
          </div>
        } />

        <Route exact path={mainCategory} render={({ match }) =>
          <div>
            <DocumentTitle title={"カテゴリ：" + match.params.main + " の記事一覧"}>
              <ArticleList type="category" subType="main" query={"?name=" + match.params.main} />
            </DocumentTitle>
            <CategoryList />
          </div>
        } />

        <Route exact path={mainCategory + subCategory} render={({ match }) =>
          <div>
            <DocumentTitle title={"カテゴリ：" + match.params.sub + " の記事一覧"}>
              <ArticleList type="category" subType="sub" query={"?name=" + match.params.sub} />
            </DocumentTitle>
            <CategoryList />
          </div>
        } />

        <Route path={articlePath} render={({ match }) =>
          // タイトルはドキュメントを取得してから付与
          <AMPDocument path={match} />
        } />
      </div>
    );
  }
}

export default withRouter(HandlePages);