import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="site">
      <Link to="/blockchain/Dapps/Truffle-pet-shop-tutorial"><p className="site-name"><span className="blue">RYOTA</span> MIZUMAKI</p></Link>
      <ul>
        <li><Link to="/web-tech/PWA-AMP">AMP / PWA</Link></li>
        <li><Link to="/web-tech/React">React</Link></li>
        <li><Link to="/blockchain">ブロックチェーン</Link></li>
        <li><Link to="/analysis">アクセス解析</Link></li>
      </ul>
    </header>
  );
}

export default Header;