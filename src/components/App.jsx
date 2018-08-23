import React from 'react';
import Header from './Header';
import HandlePages from './HandlePages';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <HandlePages />
        <Footer />
      </div>
    </BrowserRouter>);
}

export default App;