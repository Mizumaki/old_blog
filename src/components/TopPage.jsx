import React from 'react';
import { StyleSheet } from 'aphrodite';
import { Link } from 'react-router-dom';

const styles = StyleSheet.create({
  wrap: {},
});

const TopPage = () => {
  return (
    <div>
      トップページ
      <Link to="/tags?name=React">React</Link>
      <Link to="/tags?name=AMP">AMP</Link>
    </div>
  );
}

export default TopPage;