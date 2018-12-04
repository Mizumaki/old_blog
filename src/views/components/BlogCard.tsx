import * as React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import { Shadow } from '../styles/css';

interface IBlogCards {
  title: string;
  date: string;
  subCategory: string;
  lead: string;
  path: string;
}

const styles = {
  wrap: css({
    maxWidth: '70rem',
    margin: '0 auto',
    border: '1px solid grey',
    borderRadius: '.5rem',
    ':hover': {
      ...Shadow.z2,
      transition: '.2s'
    },
  }),
  main: css({
    margin: '3rem'
  }),
  category: css({
    display: 'inline-block',
    padding: '.3em 1em',
    marginBottom: '1em',
    fontSize: '1.4rem',
    borderRadius: '.3rem',
  }),
  title: css({
    marginBottom: '1em',
    fontSize: '2.4rem',
  }),
  lead: css({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'grey',
  })
}

const BlogCards = (props: IBlogCards) => {
  return (
    <div className={styles.wrap}>
      <Link to={props.path}>
        <div className={styles.main}>
          <div className={styles.category}><p>{props.subCategory}</p></div>
          <h2 className={styles.title}>{props.title}</h2>
          <p className={styles.lead}>{props.lead}</p>
        </div>
      </Link>
    </div>
  );
}

export default BlogCards;