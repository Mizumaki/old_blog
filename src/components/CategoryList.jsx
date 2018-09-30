import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';

const styles = StyleSheet.create({
  wrap: {
    maxWidth: '20rem',
    margin: '0 auto',
  },
  ul: {
    marginLeft: '1em'
  }
});

const CategoryList = (props) => {
  return (
    <div className={css(styles.wrap)}>
      <ul>
        <Link to="/products"><li>マイプロダクト</li></Link>
        <Link to="/front-end"><li>フロントエンド</li></Link>
        <ul className={css(styles.ul)}>
          <Link to="/front-end/PWA-AMP"><li>PWA-AMP</li></Link>
          <Link to="/front-end/React"><li>React</li></Link>
        </ul>
        <Link to="/blockchain"><li>ブロックチェーン</li></Link>
        <Link to="/server-side"><li>サーバーサイド</li></Link>
        <ul className={css(styles.ul)}>
          <Link to="/server-side/Firebase"><li>Firebase</li></Link>
          <Link to="/server-side/Nodejs"><li>Nodejs</li></Link>
        </ul>
      </ul>
    </div>
  );
}

export default CategoryList;