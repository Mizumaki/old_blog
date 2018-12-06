import * as React from 'react';
import { withRouter, Switch } from 'react-router';
import { RouteComponentProps, Route } from 'react-router-dom';
import ArticleList from '../containers/ArticleList';
import CategoryList from './CategoryList';
import AMPDocument from './AMPDocument';
import TopPage from './TopPage';
import MySelfPage from './MySelfPage';
import ShowTitle from './ShowTitle';
import Redirect from './Redirect';

interface IWindow { gtag: any; }
declare var window: IWindow;

type IProps = RouteComponentProps;

class HandlePages extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  // GAにPVを送る
  public componentDidUpdate(prevProps: IProps) {
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
        'page_path': this.props.location.pathname
      });
    }
  }

  public render() {
    const mainCategory = '/:main(products|front-end|server-side|blockchain|analysis)'
    const subCategory = '/:sub(NomadTime|Blazing-Fast-Blog|React|PWA-AMP|HTML-CSS-JS|Firebase|Nodejs|Ruby|Java|Dapps|Cryptocurrency|Google-Analytics)'
    // メインとサブカテゴリがパスにあり、第三階層に任意の文字が1回以上続く場合に、記事と見なす
    const articlePath = mainCategory + subCategory + '/:fileName(.+)'
    return (
      <div>
        <Switch>
          <Route exact={true} path="/">
            <div>
              <ShowTitle title="BLAZING FAST" />
              <TopPage />
            </div>
          </Route>

          <Route exact={true} path="/Who-the-F-are-you">
            <div>
              <ShowTitle title="Mizumaki Ryota - 自己紹介" />
              <MySelfPage />
            </div>
          </Route>

          <Route exact={true} path="/tags">
            <div>
              <ShowTitle title={"タグ：" + this.props.location.search.replace('?name=', '') + " の記事一覧"} />
              <ArticleList />
              <CategoryList />
            </div>
          </Route>

          <Route exact={true} path={mainCategory}>
            <div>
              <ShowTitle type="category1" />
              <ArticleList />
              <CategoryList />
            </div>
          </Route>

          <Route exact={true} path={mainCategory + subCategory}>
            <div>
              <ShowTitle type="category2" />
              <ArticleList />
              <CategoryList />
            </div>
          </Route>

          <Route exact={true} path={articlePath}>
            {/* タイトルはドキュメントを取得してから付与 */}
            <AMPDocument />
          </Route>

          <Route exact={true} path={"/amp" + articlePath}>
            <Redirect />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(HandlePages);