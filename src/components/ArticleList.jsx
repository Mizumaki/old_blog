import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Shadow } from '../styles/css';

const styles = StyleSheet.create({
  wrap: {
    padding: '3rem 1rem',
  },
  blogCard: {
    maxWidth: '70rem',
    margin: '0 auto',
    border: '1px solid grey',
    borderRadius: '.5rem',
    padding: '3rem',
    ':hover': {
      ...Shadow.z2,
      transition: '.2s'
    },
  },
  category: {
    display: 'inline-block',
    padding: '.3em 1em',
    marginBottom: '1em',
    fontSize: '1.4rem',
    borderRadius: '.3rem',
  },
  title: {
    marginBottom: '1em',
    fontSize: '2.4rem',
  },
  lead: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'grey',
  },
});

const ArticleList = () => {
  return (
    <div className={css(styles.wrap)}>
      <div className={css(styles.blogCard)}>
        <div className={css(styles.category)}><p>React</p></div>
        <h2 className={css(styles.title)}>ジェイソンステイサムはかっこいい</h2>
        <p className={css(styles.lead)}>ついに結婚が決定したジェイソン・ステイサム。
          これからもますます、"輝く"アクションスター
          としての地位を確立していくであろう、ステイサム。
          彼の魅力に迫ります。</p>
      </div>
    </div>
  );
}

export default ArticleList;