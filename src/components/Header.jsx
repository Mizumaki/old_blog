import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="site">
      <Link to="/">
        <p class="site-name pwa">
          <span class="blazing-fast">BLAZING FAST</span>
          {/* <!-- <br><span class="blue">　~ 神速 ~</span>  --> */}
        </p>
      </Link>
      <ul>
        <li><Link to="/front-end/PWA-AMP">AMP / PWA</Link></li>
        <li><Link to="/front-end/React">React</Link></li>
        <li><Link to="/blockchain">ブロックチェーン</Link></li>
        <li><Link to="/front-end/Firebase">Firebase</Link></li>
        <li><Link to="/server-side">Node.js / Ruby / Java</Link></li>
      </ul>
    </header>
  );
}

export default Header;