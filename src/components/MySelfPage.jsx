import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  wrap: {
    textAlign: 'center'
  },
});

const MySelfPage = (props) => {
  return (
    <div className={css(styles.wrap)}>すみません、誠意制作中です。お待ちください。。😥</div>
  );
}

export default MySelfPage;