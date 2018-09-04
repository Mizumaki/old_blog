import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import handleResponseErrors from './handleResponseErrors';

const styles = StyleSheet.create({
  wrap: {
    padding: '3rem 1rem',
  },
});

class Articlelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [] };
  }

  componentDidMount() {
    fetch(`https://ryota-mizumaki.com/api/article-list/${this.props.type}/${this.props.subType}?name=${this.props.query}`)
      .catch((err) => { throw Error(err); }) // ネットワークなどのリクエスト以前のエラー処理
      .then((res) => handleResponseErrors(res))
      .then((res) => {
        console.log('in fetch success');
        return res.json();
      })
      .then((articles) => this.setState({ articles: articles }))
      .catch((err) => console.log("There has been error in fetch operation: ", err.message))
  }

  componentDidUpdate() {
    fetch(`https://ryota-mizumaki.com/api/article-list/${this.props.type}/${this.props.subType}?name=${this.props.query}`)
      .catch((err) => { throw Error(err); }) // ネットワークなどのリクエスト以前のエラー処理
      .then((res) => handleResponseErrors(res))
      .then((res) => {
        console.log('in fetch success');
        return res.json();
      })
      .then((articles) => this.setState({ articles: articles }))
      .catch((err) => console.log("There has been error in fetch operation: ", err.message))
  }

  render() {
    const articles = this.state.articles
    const blogCards = articles.map((article) => {
      return (
        <div className={css(styles.wrap)}>
          <Link to={article.path}>
            <BlogCard title={article.title} subCategory={article.subCategory} lead={article.lead} date={article.date} />
          </Link>
        </div>
      )
    });

    return (
      <div>
        {blogCards}
      </div>
    );
  }
}

export default Articlelist;