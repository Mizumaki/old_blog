import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="site">
      <Link to="/"><p className="site-name"><span className="blue">RYOTA</span> MIZUMAKI</p></Link>
      <ul>
        <li><Link to="/web-tech/pwa-amp">AMP / PWA</Link></li>
        <li><Link to="/web-tech/react">React</Link></li>
        <li><Link to="/blockchain">ブロックチェーン</Link></li>
        <li><Link to="/analysis">アクセス解析</Link></li>
      </ul>
    </header>
  );
}

export default Header;