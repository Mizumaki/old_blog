import * as React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

const wrap = css({
  maxWidth: '20rem',
  margin: '0 auto',
})

const ul = css({
  marginLeft: '1em'
})

const CategoryList = () => {
  return (
    <div className={wrap}>
      <ul>
        <Link to="/products"><li>マイプロダクト</li></Link>
        <Link to="/front-end"><li>フロントエンド</li></Link>
        <ul className={ul}>
          <Link to="/front-end/PWA-AMP"><li>PWA-AMP</li></Link>
          <Link to="/front-end/React"><li>React</li></Link>
        </ul>
        <Link to="/blockchain"><li>ブロックチェーン</li></Link>
        <Link to="/server-side"><li>サーバーサイド</li></Link>
        <ul className={ul}>
          <Link to="/server-side/Firebase"><li>Firebase</li></Link>
          <Link to="/server-side/Nodejs"><li>Nodejs</li></Link>
        </ul>
      </ul>
    </div>
  );
}

export default CategoryList;