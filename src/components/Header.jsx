import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="site">
      <Link to="/blockchain/Dapps/Truffle-pet-shop-tutorial"><p class="site-name amp">BLAZING FAST<br/><span class="blue">　~ 神速 ~</span></p></Link>
      <ul>
        <li><Link to="/web-tech/PWA-AMP">AMP / PWA</Link></li>
        <li><Link to="/web-tech/React">React</Link></li>
        <li><Link to="/blockchain/Dapps">ブロックチェーン</Link></li>
        <li><Link to="/web-tech/Firebase">Firebase</Link></li>
        <li><Link to="/analysis">アクセス解析</Link></li>
      </ul>
    </header>
  );
}

export default Header;