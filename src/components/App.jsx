import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Header from './Header';
import HandlePages from './HandlePages';
import Footer from './Footer';

const styles = StyleSheet.create({
  wrap: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: '1 0',
  }
});

const App = () => {
  return (
    <div className={css(styles.wrap)}>
      <Header />
      <div className={css(styles.main)}>
        <HandlePages />
      </div>
      <Footer />
    </div>
  );
}

export default App;