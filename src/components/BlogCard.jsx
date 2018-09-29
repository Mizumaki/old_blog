import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Shadow } from '../styles/css';
import { Link } from 'react-router-dom';

const styles = StyleSheet.create({
  wrap: {
    maxWidth: '70rem',
    margin: '0 auto',
    border: '1px solid grey',
    borderRadius: '.5rem',
    ':hover': {
      ...Shadow.z2,
      transition: '.2s'
    },
  },
  main: {
    margin: '3rem'
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

const BlogCards = (props) => {
  return (
    <div className={css(styles.wrap)}>
      <Link to={props.path}>
        <div className={css(styles.main)}>
          <div className={css(styles.category)}><p>{props.subCategory}</p></div>
          <h2 className={css(styles.title)}>{props.title}</h2>
          <p className={css(styles.lead)}>{props.lead}</p>
        </div>
      </Link>
    </div>
  );
}

export default BlogCards;