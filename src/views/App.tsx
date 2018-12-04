import * as React from 'react';
import { css } from 'emotion';
import ScrollToTop from './containers/ScrollToTop';
import Header from './components/Header';
// import HandlePages from './components/HandlePages';
import Footer from './components/Footer';
import TopPage from './components/TopPage';
import { Route, Switch } from 'react-router';
import ArticleList from './containers/ArticleList';

const styles = {
  wrap: css({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  }),
  main: css({
    flex: '1 0'
  })
}

const App = () => {
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.main}>
        <ScrollToTop>
          <p>hello, world</p>
          <Switch>
            <Route exact={true} path="/">
              <div>
                <p>top</p>
                <TopPage />
              </div>
            </Route>
            <Route exact={true} path="/front-end/React">
              <div>
                <p>react</p>
                <ArticleList />
              </div>
            </Route>
          </Switch>
          {/*<HandlePages />*/}
        </ScrollToTop>
      </div>
      <Footer />
    </div>
  );
}

export default App;