import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withRouter } from 'react-router';
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
    this.fetchArticleList = this.fetchArticleList.bind(this);
  }

  componentDidMount() {
    this.fetchArticleList();
  }

  componentDidUpdate(prevProps) {
    // type, subtype is always equal, so handle update whether query is different or not
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.fetchArticleList();
    } else { console.log('else') }
  }

  fetchArticleList() {
    const params = this.props.match.params;
    const location = this.props.location;
    // If props is maunally defined, use props. Otherwise, use match object.
    const urlType = location.pathname === '/tags' ? "tags" : "category";
    const listType = this.props.type ? this.props.type : urlType;
    const categoryType = (listType === "category") ? (params.sub ? "sub" : "main") : "";
    const searchType = (listType === "category") ? (params.sub ? "?name=" + params.sub : "?name=" + params.main): location.search;
    const search = this.props.query ? this.props.query : searchType;
    fetch(`https://ryota-mizumaki.com/api/article-list/${listType}${categoryType ? "/" + categoryType : ""}${search}`)
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
    const blogCards = articles.map((article, i) => {
      return (
        <div className={css(styles.wrap)} key={i}>
          <BlogCard title={article.title} subCategory={article.subCategory} lead={article.lead} date={article.date} path={article.path} />
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

export default withRouter(Articlelist);