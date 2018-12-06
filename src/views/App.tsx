import * as React from 'react';
import { css } from 'emotion';
import ScrollToTop from './containers/ScrollToTop';
import Header from './components/Header';
import HandlePages from './components/HandlePages';
import Footer from './components/Footer';

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
          <HandlePages />
        </ScrollToTop>
      </div>
      <Footer />
    </div>
  );
}

export default App;